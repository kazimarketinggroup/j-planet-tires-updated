import TireRangeLandingPage from './TireRangeLandingPage';
import heroImage from '../../../assets/home/pcr-sub/truck-tractor-unit-prime-mover-traction-unit-in-2026-03-24-11-06-29-utc 1.png';
import featureImage from '../../../assets/home/pcr-sub/semi-truck-wheels-shined-and-ready-for-transport-2026-03-20-03-30-19-utc 2.png';
import rangeImage from '../../../assets/home/pcr-sub/Rectangle 11.png';

const PcrSubTiresPage = () => (
  <TireRangeLandingPage
    segments={['passenger', 'suv_ltr']}
    maxCards={5}
    rangeBeforeWhy
    useSizeExplorer
    images={{ hero: heroImage, feature: featureImage, otherRange: rangeImage }}
    copy={{
      title: 'PCR/SUV Tires',
      headTitle: 'PCR/SUV Tires',
      headDescription:
        'Explore J.Planet Tire PCR and SUV tires for comfort, grip, long tread life, and stable everyday performance.',
      badge: 'Manufactured in Korea',
      subtitle: 'Comfort, dry grip and long tread life engineered for compact and mid-size passenger cars.',
      statsProductSub: 'Comfort, dry grip and long tread life',
      originValue: 'Korea',
      originSub: 'Manufacturing Origin',
      introTitle: 'Engineered for Comfort. Built for Control.',
      introParagraphs: [
        'Our PCR and SUV range is engineered to deliver comfort, control and confidence across every passenger vehicle, from compact cars and sedans to SUVs and light trucks.',
        'High performance compounds and semi-dual continuous center ribs support stable handling, responsive cornering, braking response and steering feel at highway speeds.',
        'Across the full range, drivers benefit from excellent dry and wet performance, low noise, long tread life and reliable stability wherever the road takes them.',
      ],
      whyTitle: 'Why Choose Our PCR & SUV Tires',
      benefits: [
        'Excellent dry and wet performance for confident grip and control in all conditions.',
        'Comfort and low noise for smooth, quiet everyday driving.',
        'Improved durability with reinforced construction for long tread life.',
        'Confident handling with responsive steering and stable highway performance.',
      ],
      rangeTitle: 'Explore the PCR/SUV Range',
      emptyText: 'No PCR/SUV tires are published yet.',
      finderTitle: 'PCR Tire Finder',
    }}
  />
);

export default PcrSubTiresPage;
