import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../../admin/lib/supabase';
import { useLanguage } from '../../../i18n/LanguageContext';
import AutoText from '../../../i18n/AutoText';
import type { TirePositionLegend, TireVehiclePosition } from '../../../admin/types/database';

interface Props {
  tireId: string;
}

interface RecommendedPositionData {
  vehiclePositions: TireVehiclePosition[];
  legends: TirePositionLegend[];
}

const fetchRecommendedPositionData = async (tireId: string): Promise<RecommendedPositionData> => {
  const [vehiclePositionsRes, legendsRes] = await Promise.all([
    supabase
      .from('tire_vehicle_positions')
      .select('*')
      .eq('tire_id', tireId)
      .order('display_order', { ascending: true }),
    supabase
      .from('tire_position_legends')
      .select('*')
      .eq('tire_id', tireId)
      .order('display_order', { ascending: true }),
  ]);

  if (vehiclePositionsRes.error) throw vehiclePositionsRes.error;
  if (legendsRes.error) throw legendsRes.error;

  return {
    vehiclePositions: (vehiclePositionsRes.data as unknown as TireVehiclePosition[] | null) ?? [],
    legends: (legendsRes.data as unknown as TirePositionLegend[] | null) ?? [],
  };
};

const RecommendedPositionTab = ({ tireId }: Props) => {
  const { t } = useLanguage();
  const [data, setData] = useState<RecommendedPositionData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    setData(null);
    setError(false);

    fetchRecommendedPositionData(tireId)
      .then((nextData) => {
        if (active) setData(nextData);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, [tireId]);

  if (error) {
    return <p className="text-sm text-gray-500">{t('detail.positionsError')}</p>;
  }

  if (!data) {
    return (
      <div className="flex min-h-32 items-center justify-center text-gray-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (data.vehiclePositions.length === 0 && data.legends.length === 0) {
    return <p className="text-sm text-gray-500">{t('detail.positionsEmpty')}</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-lg bg-white px-6 py-7 shadow-sm sm:px-8 md:flex-row md:justify-between md:px-10">
      <div className="flex min-h-20 flex-1 items-center justify-center md:justify-start">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-5 md:flex-nowrap md:justify-start md:gap-7">
          {data.vehiclePositions.map(
            (position) =>
              position.icon_image_url && (
                <img
                  key={position.id}
                  src={position.icon_image_url}
                  alt={position.vehicle_label || ''}
                className="h-20 w-auto max-w-[240px] object-contain sm:h-24 sm:max-w-[300px] md:h-28 md:max-w-[360px]"
                />
              ),
          )}
        </div>
      </div>

      {data.legends.length > 0 && (
        <ul className="w-full max-w-[210px] space-y-2.5 md:w-[210px]">
          {data.legends.map((legend) => (
            <li
              key={legend.id}
              className="grid grid-cols-[1fr_auto] items-center gap-4 text-[12px] font-semibold leading-tight text-[#2b2b2b] sm:text-sm"
            >
              <span><AutoText>{legend.label}</AutoText></span>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full border border-[#2b2b2b]"
                style={{ backgroundColor: legend.color }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendedPositionTab;
