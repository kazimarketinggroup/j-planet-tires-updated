import { localKey, type SizeRow } from './editorTypes';
import { resolveCsvHeaders, type ResolvedColumn } from './sizeSpec';

export interface CsvRowResult {
  row: SizeRow;
  errors: string[];
}

export interface CsvParseResult {
  columns: ResolvedColumn[];
  rows: CsvRowResult[];
}

// Parse CSV records into editor size rows keyed by resolved column_key, plus the
// resolved column set (common vs custom) detected from the header row. Values are
// keyed by column.key; the model/group column is pulled out into model_label.
export const parseCsv = (
  records: Record<string, string>[],
  headers: string[],
): CsvParseResult => {
  const { columns, modelHeader } = resolveCsvHeaders(headers);
  const hasSize = columns.some((c) => c.key === 'size');

  const rows = records.map((record) => {
    const values: Record<string, string> = {};
    for (const col of columns) {
      values[col.key] = (record[col.label] ?? '').toString().trim();
    }
    const modelLabel = modelHeader ? (record[modelHeader] ?? '').toString().trim() : '';

    const errors: string[] = [];
    if (hasSize && !values['size']) errors.push('Missing size');
    for (const col of columns) {
      if (col.isCommon && col.numeric && values[col.key] && Number.isNaN(Number(values[col.key]))) {
        errors.push(`${col.label} "${values[col.key]}" is not a plain number — will still be imported as text`);
      }
    }

    return { row: { _key: localKey(), model_label: modelLabel, values }, errors };
  });

  return { columns, rows };
};
