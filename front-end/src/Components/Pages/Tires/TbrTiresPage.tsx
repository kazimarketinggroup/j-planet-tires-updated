import TireRangeLandingPage from './TireRangeLandingPage';
import heroImage from '../../../assets/home/tbr-tires/truck-tractor-unit-prime-mover-traction-unit-in-2026-03-24-11-06-29-utc 1.png';
import featureImage from '../../../assets/home/tbr-tires/semi-truck-wheels-shined-and-ready-for-transport-2026-03-20-03-30-19-utc 2.png';

const TbrTiresPage = () => (
  <TireRangeLandingPage
    segments={['truck_bus']}
    maxCards={6}
    showOtherRange={false}
    rangeBeforeWhy
    useSizeExplorer
    images={{ hero: heroImage, feature: featureImage, otherRange: featureImage }}
    copy={{
      title: 'TBR Tires',
      headTitle: 'TBR Tires',
      headDescription:
        'Explore J.Planet Tire TBR tires for steer, drive, trailer and bus or coach positions with long-haul reliability.',
      badge: 'Manufactured in Thailand & Vietnam',
      subtitle:
        'Engineered for steer, drive, trailer and bus/coach positions built for fleet uptime and long-haul reliability.',
      statsProductSub: 'For steer, drive, trailer and bus/coach',
      originValue: 'Thailand & Vietnam',
      originSub: 'Manufacturing Origin',
      introTitle: 'Built for Every Position on the Fleet',
      introParagraphs: [
        'TBR tires are engineered to keep commercial fleets moving, mile after mile. Built for steer, drive, trailer and bus or coach positions, our TBR range covers every fitment a haulage company, bus operator or distributor needs.',
        'Fleet uptime is central to the design. Reinforced casings and strengthened crown construction add higher load capacity and puncture resistance, reducing downtime and keeping vehicles on the road longer between services.',
        'Durability and retreadability run through the entire range, with robust casings engineered for multiple retread cycles and reliable performance across every axle position and road condition.',
      ],
      whyTitle: 'Why Choose Our TBR Tires',
      benefits: [
        'Fleet uptime engineered for measurable gains in mileage and tread life.',
        'High load capacity with reinforced casings built for heavy-duty hauling.',
        'Fuel efficiency from low rolling resistance compounds that cut running costs.',
        'Retreadability with robust casings designed for multiple retread cycles.',
      ],
      rangeTitle: 'Explore the TBR Range',
      emptyText: 'No TBR tires are published yet.',
      finderTitle: 'TBR Tire Finder',
      viewAllLabel: 'View All TBR Tires',
    }}
  />
);

export default TbrTiresPage;
