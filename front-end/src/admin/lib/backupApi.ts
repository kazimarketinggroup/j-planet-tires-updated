import { supabase } from './supabase';

// Every catalogue table a full backup should capture, in FK-safe order
// (parents before children) so a future restore script can replay it as-is.
const BACKUP_TABLES = [
  'tire_categories',
  'tires',
  'tire_tabs',
  'tire_performance_metrics',
  'tire_features',
  'tire_size_columns',
  'tire_sizes',
  'tire_recommended_positions',
  'tire_vehicle_positions',
  'tire_position_legends',
  'tire_finder_by_size',
  'tire_finder_by_vehicle',
  'tire_finder_dropdown_options',
] as const;

export interface BackupData {
  exported_at: string;
  tables: Record<string, unknown[]>;
}

// Fetch every catalogue table and return one JSON-serialisable snapshot.
// Read-only — never touches the database.
export const buildBackup = async (): Promise<BackupData> => {
  const results = await Promise.all(
    BACKUP_TABLES.map((table) => supabase.from(table).select('*')),
  );

  const tables: Record<string, unknown[]> = {};
  results.forEach((res, i) => {
    const table = BACKUP_TABLES[i];
    if (res.error) throw new Error(`Failed to export ${table}: ${res.error.message}`);
    tables[table] = res.data ?? [];
  });

  return { exported_at: new Date().toISOString(), tables };
};

// Build a backup and trigger a browser download of the resulting JSON file.
export const downloadBackup = async (): Promise<void> => {
  const backup = await buildBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jplanet-tire-backup-${backup.exported_at.slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
