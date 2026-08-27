import TireRangeLandingPage from './TireRangeLandingPage';
import heroImage from '../../../assets/home/otr-tires/truck-tractor-unit-prime-mover-traction-unit-in-2026-03-24-11-06-29-utc 1.png';
import featureImage from '../../../assets/home/otr-tires/semi-truck-wheels-shined-and-ready-for-transport-2026-03-20-03-30-19-utc 2.png';
import rangeImage from '../../../assets/home/otr-tires/Rectangle 11.png';

const OtrTiresPage = () => (
  <TireRangeLandingPage
    segments={['highway_otr']}
    maxCards={1}
    rangeBeforeWhy
    showFinder={false}
    images={{ hero: heroImage, feature: featureImage, otherRange: rangeImage }}
    copy={{
      title: 'OTR Tires',
      headTitle: 'OTR Tires',
      headDescription:
        'Explore J.Planet Tire OTR tires with reinforced sidewalls and block tread patterns for rough job sites.',
      badge: 'Construction & Heavy-Duty',
      subtitle: 'Reinforced sidewalls and block tread patterns built for gravel, mud, cement and paved job sites.',
      statsProductSub: 'Reinforced sidewalls and block tread patterns',
      originValue: 'Global',
      originSub: 'Distribution',
      introTitle: 'Built to Perform Where It Matters Most',
      introParagraphs: [
        'OTR tires are engineered to handle the toughest job site conditions, from construction yards to quarries and everything in between. Built around a block pattern design, the range delivers traction, grip and handling performance across uneven and unpredictable terrain.',
        'Durability is central to the design. Reinforced body construction, shoulder protection and sidewall protection provide resistance to punctures and scrapes common on active construction and mining sites.',
        'The comprehensive pattern design makes our OTR tires suitable for loading operations including gravel roads, block brick roads, muddy roads, cement roads, pavements and rough surfaces.',
      ],
      whyTitle: 'Why Choose Our OTR Tires',
      benefits: [
        'Reinforced sidewalls built to withstand rough, uneven terrain.',
        'Strong traction with block pattern engineering for gravel, mud and paved surfaces.',
        'Site-ready durability designed for construction and mining operations.',
      ],
      rangeTitle: 'Explore the OTR Range',
      emptyText: 'No OTR tires are published yet.',
      finderTitle: 'OTR Tire Finder',
    }}
  />
);

export default OtrTiresPage;
