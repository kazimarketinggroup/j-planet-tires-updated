import { supabase } from './supabase';
import type { Profile, ProfileRole, ProfileStatus } from '../types/database';

export const fetchProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  const rows = (data as Profile[]) ?? [];
  // Pending first, then by email.
  return rows.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
    return (a.email ?? '').localeCompare(b.email ?? '');
  });
};

export const updateProfile = async (
  id: string,
  patch: Partial<{ role: ProfileRole; status: ProfileStatus }>,
): Promise<void> => {
  const { error } = await supabase.from('profiles').update(patch).eq('id', id);
  if (error) throw error;
};

export const deleteProfile = async (id: string): Promise<void> => {
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
};
