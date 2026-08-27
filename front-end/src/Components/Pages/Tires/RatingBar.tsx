import AutoText from '../../../i18n/AutoText';

interface RatingBarProps {
  label: string;
  value: number;
  max?: number;
}

const RatingBar = ({ label, value, max = 5 }: RatingBarProps) => (
  <div className="flex items-center gap-4">
    <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:w-36">
      <AutoText>{label}</AutoText>
    </span>
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-[#1148c6]"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="w-8 shrink-0 text-right text-sm font-semibold text-[#111111]">
      {value.toFixed(1)}
    </span>
  </div>
);

export default RatingBar;
