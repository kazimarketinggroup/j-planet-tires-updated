// URL key for a single size row's detail page (/tires/:tireId/:sizeKey).
//
// `erp_no` is the intended long-term key, but that column does not exist yet and
// every row would be null, so the size text is slugified as a fallback. Rows move
// onto the clean ERP URL automatically once the column is populated — no code
// change needed here beyond reading it.
import type { TireSize } from '../../../admin/types/database';

// tire_sizes rows may carry erp_no/part_no once the column is added; until then
// the values arrive (if at all) inside extra_specs from a CSV import.
const readSpec = (size: TireSize, key: string): string => {
  const direct = (size as unknown as Record<string, unknown>)[key];
  if (direct !== null && direct !== undefined && direct !== '') return String(direct);
  const extra = size.extra_specs?.[key];
  if (extra !== null && extra !== undefined && extra !== '') return String(extra);
  return '';
};

export const erpNo = (size: TireSize): string => readSpec(size, 'erp_no');
export const partNo = (size: TireSize): string => readSpec(size, 'part_no');

// "245/70R17.5" -> "245-70r17.5". Slashes and spaces break the path segment, so
// they collapse to dashes; everything else stays readable in the URL bar.
export const slugifySize = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// The URL segment identifying this size. Empty when the row has neither an ERP
// number nor size text — such a row gets no link and no page.
export const sizeKey = (size: TireSize): string => {
  const erp = erpNo(size);
  if (erp) return slugifySize(erp);
  return size.size ? slugifySize(size.size) : '';
};

export const findSizeByKey = (sizes: TireSize[], key: string): TireSize | undefined => {
  const wanted = key.toLowerCase();
  return sizes.find((s) => sizeKey(s).toLowerCase() === wanted);
};
