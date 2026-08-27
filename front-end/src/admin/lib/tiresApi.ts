import { supabase } from './supabase';
import { slugify } from './slugify';
import type { Tire, TireWithCategory } from '../types/database';

export const fetchTiresWithCategory = async (): Promise<TireWithCategory[]> => {
  const { data, error } = await supabase
    .from('tires')
    .select('*, category:tire_categories(*)')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data as unknown as TireWithCategory[]) ?? [];
};

export const setTirePublished = async (id: string, isPublished: boolean): Promise<void> => {
  const { error } = await supabase.from('tires').update({ is_published: isPublished }).eq('id', id);
  if (error) throw error;
};

export const deleteTire = async (id: string): Promise<void> => {
  // Child rows are expected to be removed via ON DELETE CASCADE; if not configured,
  // remove dependents first to avoid FK violations.
  const childTables = [
    'tire_tabs',
    'tire_performance_metrics',
    'tire_features',
    'tire_sizes',
    'tire_size_columns',
    'tire_recommended_positions',
  ] as const;
  for (const table of childTables) {
    await supabase.from(table).delete().eq('tire_id', id);
  }
  const { error } = await supabase.from('tires').delete().eq('id', id);
  if (error) throw error;
};

// Deep-duplicate a tire and all its child rows. Returns the new tire id.
export const duplicateTire = async (id: string): Promise<string> => {
  const { data: original, error: fetchError } = await supabase
    .from('tires')
    .select('*')
    .eq('id', id)
    .single();
  if (fetchError || !original) throw fetchError ?? new Error('Tire not found');

  const source = original as Tire;
  const { id: _omitId, created_at: _c, updated_at: _u, ...rest } = source;
  void _omitId;
  void _c;
  void _u;

  const newTire = {
    ...rest,
    name: `${source.name} (Copy)`,
    slug: `${slugify(source.name)}-copy-${Math.random().toString(36).slice(2, 7)}`,
    is_published: false,
  };

  const { data: inserted, error: insertError } = await supabase
    .from('tires')
    .insert(newTire)
    .select('id')
    .single();
  if (insertError || !inserted) throw insertError ?? new Error('Failed to duplicate tire');

  const newId = (inserted as { id: string }).id;

  const childTables = [
    'tire_tabs',
    'tire_performance_metrics',
    'tire_features',
    'tire_sizes',
    'tire_size_columns',
    'tire_recommended_positions',
  ] as const;

  for (const table of childTables) {
    const { data: children } = await supabase.from(table).select('*').eq('tire_id', id);
    if (children && children.length) {
      const cloned = (children as Record<string, unknown>[]).map((row) => {
        const { id: _rid, ...childRest } = row;
        void _rid;
        return { ...childRest, tire_id: newId };
      });
      await supabase.from(table).insert(cloned);
    }
  }

  return newId;
};
