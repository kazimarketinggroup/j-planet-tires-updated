import { supabase } from './supabase';
import type { Segment, TabType, TireCategory } from '../types/database';

export const fetchCategories = async (): Promise<TireCategory[]> => {
  const { data, error } = await supabase.from('tire_categories').select('*').order('name');
  if (error) throw error;
  return (data as TireCategory[]) ?? [];
};

export interface CategoryInput {
  name: string;
  slug: string;
  segment: Segment;
  default_tabs: TabType[];
}

export const createCategory = async (input: CategoryInput): Promise<void> => {
  const { error } = await supabase.from('tire_categories').insert(input);
  if (error) throw error;
};

export const updateCategory = async (id: string, input: CategoryInput): Promise<void> => {
  const { error } = await supabase.from('tire_categories').update(input).eq('id', id);
  if (error) throw error;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { count, error: countError } = await supabase
    .from('tires')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);
  if (countError) throw countError;
  if ((count ?? 0) > 0) {
    throw new Error(`Cannot delete — ${count} tire(s) still use this category`);
  }
  const { error } = await supabase.from('tire_categories').delete().eq('id', id);
  if (error) throw error;
};
