import tireImage from '../../../assets/tires/Apollo-EnduMile-LHFront 1.png';

export type Axle = 'Steer' | 'Drive' | 'Trailer' | 'Bus/Coach';

export interface PerformanceRatings {
  dry: number;
  wet: number;
  fuelConsumption: number;
  comfortNoise: number;
  wear: number;
  snow: number;
  durability: number;
}

export interface Tire {
  id: string;
  name: string;
  category: string;
  axle: Axle;
  description: string;
  width: number;
  profile: number;
  rim: string;
  fullSize: string;
  loadSpeed: string;
  keyBenefit: string;
  image: string;
  performance: PerformanceRatings;
}

export const TIRES: Tire[] = [
  {
    id: 't100',
    name: 'JP-T100',
    category: 'Highway Steer',
    axle: 'Steer',
    description: 'Long-haul steer pattern for even wear and fuel economy.',
    width: 295,
    profile: 80,
    rim: '22.5',
    fullSize: '295/80 R22.5',
    loadSpeed: '152/148 L',
    keyBenefit: 'Even wear & stability',
    image: tireImage,
    performance: { dry: 4, wet: 3.5, fuelConsumption: 4, comfortNoise: 3.5, wear: 4, snow: 3, durability: 4 },
  },
  {
    id: 's110',
    name: 'JP-S110',
    category: 'Highway Steer',
    axle: 'Steer',
    description: 'Long-haul steer pattern for even wear and fuel economy.',
    width: 315,
    profile: 70,
    rim: '22.5',
    fullSize: '315/70 R22.5',
    loadSpeed: '154/150 L',
    keyBenefit: 'High mileage & grip',
    image: tireImage,
    performance: { dry: 4, wet: 4, fuelConsumption: 3.5, comfortNoise: 3.5, wear: 4.5, snow: 3, durability: 4 },
  },
  {
    id: 's120',
    name: 'JP-S120',
    category: 'Regional Steer',
    axle: 'Steer',
    description: 'Regional steer pattern balancing wear life and ride comfort.',
    width: 275,
    profile: 70,
    rim: '22.5',
    fullSize: '275/70 R22.5',
    loadSpeed: '148/145 J',
    keyBenefit: 'Even wear & stability',
    image: tireImage,
    performance: { dry: 3.5, wet: 3.5, fuelConsumption: 4, comfortNoise: 4, wear: 4, snow: 3, durability: 3.5 },
  },
  {
    id: 'd200',
    name: 'JP-D200',
    category: 'Highway Drive',
    axle: 'Drive',
    description: 'Open-shoulder drive pattern built for traction and load handling.',
    width: 295,
    profile: 80,
    rim: '22.5',
    fullSize: '295/80 R22.5',
    loadSpeed: '152/148 L',
    keyBenefit: 'High traction',
    image: tireImage,
    performance: { dry: 4, wet: 3.5, fuelConsumption: 3.5, comfortNoise: 3, wear: 4.5, snow: 3.5, durability: 4.5 },
  },
  {
    id: 'd210',
    name: 'JP-D210',
    category: 'Long-Haul Drive',
    axle: 'Drive',
    description: 'Closed-shoulder drive pattern for fuel-efficient long-haul fleets.',
    width: 315,
    profile: 70,
    rim: '22.5',
    fullSize: '315/70 R22.5',
    loadSpeed: '154/150 L',
    keyBenefit: 'Fuel efficiency',
    image: tireImage,
    performance: { dry: 4, wet: 3.5, fuelConsumption: 4.5, comfortNoise: 3, wear: 4, snow: 3, durability: 4.5 },
  },
  {
    id: 'tr300',
    name: 'JP-TR300',
    category: 'Highway Trailer',
    axle: 'Trailer',
    description: 'Free-rolling trailer pattern for low rolling resistance.',
    width: 385,
    profile: 65,
    rim: '22.5',
    fullSize: '385/65 R22.5',
    loadSpeed: '160 K',
    keyBenefit: 'Low rolling resistance',
    image: tireImage,
    performance: { dry: 3.5, wet: 3, fuelConsumption: 4.5, comfortNoise: 3.5, wear: 4, snow: 2.5, durability: 4.5 },
  },
  {
    id: 'tr310',
    name: 'JP-TR310',
    category: 'Regional Trailer',
    axle: 'Trailer',
    description: 'All-position trailer pattern for regional distribution work.',
    width: 235,
    profile: 75,
    rim: '17.5',
    fullSize: '235/75 R17.5',
    loadSpeed: '143/141 J',
    keyBenefit: 'Even wear & stability',
    image: tireImage,
    performance: { dry: 3.5, wet: 3, fuelConsumption: 4, comfortNoise: 3.5, wear: 4, snow: 2.5, durability: 4 },
  },
  {
    id: 'b400',
    name: 'JP-B400',
    category: 'City Bus',
    axle: 'Bus/Coach',
    description: 'Reinforced bus pattern engineered for stop-start city duty cycles.',
    width: 275,
    profile: 70,
    rim: '22.5',
    fullSize: '275/70 R22.5',
    loadSpeed: '148/145 J',
    keyBenefit: 'Heat & wear resistance',
    image: tireImage,
    performance: { dry: 3.5, wet: 3.5, fuelConsumption: 3.5, comfortNoise: 4, wear: 4, snow: 3, durability: 4.5 },
  },
  {
    id: 'b410',
    name: 'JP-B410',
    category: 'Coach Touring',
    axle: 'Bus/Coach',
    description: 'Touring coach pattern for stable high-speed motorway runs.',
    width: 295,
    profile: 80,
    rim: '22.5',
    fullSize: '295/80 R22.5',
    loadSpeed: '152/148 L',
    keyBenefit: 'High-speed stability',
    image: tireImage,
    performance: { dry: 4.5, wet: 4, fuelConsumption: 3.5, comfortNoise: 4.5, wear: 4, snow: 3, durability: 4 },
  },
];

export const AXLES: Axle[] = ['Steer', 'Drive', 'Trailer', 'Bus/Coach'];
export const WIDTHS = Array.from(new Set(TIRES.map((tire) => tire.width))).sort((a, b) => a - b);
export const PROFILES = Array.from(new Set(TIRES.map((tire) => tire.profile))).sort((a, b) => a - b);
export const RIMS = Array.from(new Set(TIRES.map((tire) => tire.rim))).sort();

export interface TireFilters {
  width?: number;
  profile?: number;
  rim?: string;
  axle?: Axle;
}

export interface AxleContent {
  benefits: string[];
  longDescription: string[];
}

export const AXLE_CONTENT: Record<Axle, AxleContent> = {
  Steer: {
    benefits: ['Even wear & stability', 'Long lasting tread life', 'Better comfort & low noise'],
    longDescription: [
      'Built for steer axles that clock serious motorway miles, this pattern is tuned to keep the front end tracking straight and predictable under load, in wet weather and on long climbs.',
      'A well-balanced footprint spreads contact pressure evenly across the tread, resisting irregular wear even across mixed regional and long-haul routes, so fleets get consistent mileage axle to axle.',
    ],
  },
  Drive: {
    benefits: ['High traction', 'Extended tread life', 'Reduced fuel consumption'],
    longDescription: [
      'An open-shoulder drive pattern engineered to put power down cleanly under load, this tire is built for fleets that need dependable traction in wet, loose or uneven yard conditions.',
      'Deep, durable tread blocks resist scrubbing and tearing under torque, while the compound is tuned to balance grip against rolling resistance for better fuel economy over the tire\'s service life.',
    ],
  },
  Trailer: {
    benefits: ['Low rolling resistance', 'Long lasting tread life', 'Stable high-mileage performance'],
    longDescription: [
      'A free-rolling trailer pattern designed to minimise rolling resistance across high-mileage routes, helping fleets reduce fuel spend without compromising on durability.',
      'A rigid casing and even-wear tread design keep the trailer tracking true, reducing irregular wear that can otherwise cut a tire\'s service life short on multi-drop or motorway runs.',
    ],
  },
  'Bus/Coach': {
    benefits: ['Heat & wear resistance', 'High-speed stability', 'Reduced cabin noise'],
    longDescription: [
      'Engineered for the demands of passenger operation, this pattern is reinforced to handle stop-start duty cycles and sustained high-speed running without sacrificing comfort.',
      'A heat-resistant compound and tuned tread pattern keep noise down for passengers while standing up to the wear that comes with tight urban routes or long motorway transfers.',
    ],
  },
};

const RIM_WIDTH_BY_SECTION_WIDTH: Record<number, number> = {
  235: 7,
  275: 8,
  295: 9,
  315: 9.75,
  385: 11.75,
};

const TREAD_DEPTH_BY_AXLE: Record<Axle, number> = {
  Steer: 13,
  Drive: 17,
  Trailer: 9,
  'Bus/Coach': 15,
};

// Standard ISO/ETRTO load index -> max load (kg) at max speed, single fitment.
const LOAD_INDEX_TO_KG: Record<number, number> = {
  141: 2575,
  142: 2650,
  143: 2725,
  144: 2800,
  145: 2900,
  146: 3000,
  147: 3075,
  148: 3150,
  149: 3250,
  150: 3350,
  151: 3450,
  152: 3550,
  153: 3650,
  154: 3750,
  155: 3875,
  156: 4000,
  157: 4125,
  158: 4250,
  159: 4375,
  160: 4500,
};

// Standard ISO speed symbol -> max speed (km/h).
const SPEED_SYMBOL_TO_KMH: Record<string, number> = {
  J: 100,
  K: 110,
  L: 120,
  M: 130,
};

const parseLoadSpeed = (loadSpeed: string) => {
  const [loadPart, speedSymbol] = loadSpeed.split(' ');
  const [single, dual] = loadPart.split('/').map(Number);

  return {
    singleLoadIndex: single,
    dualLoadIndex: Number.isNaN(dual) ? undefined : dual,
    speedSymbol,
  };
};

export interface TireTechnicalSpec {
  sectionWidthMm: number;
  sectionWidthIn: string;
  overallDiameterMm: number;
  overallDiameterIn: string;
  recommendedRimWidthIn: number;
  rimWidthRangeIn: string;
  treadDepthMm: number;
  treadDepth32nds: number;
  singleLoadIndex: number;
  dualLoadIndex?: number;
  speedSymbol: string;
  maxSpeedKmh?: number;
  maxLoadSingleKg?: number;
  maxLoadDualKg?: number;
  maxPressurePsi: number;
  maxPressureKpa: number;
}

export const getTechnicalSpec = (tire: Tire): TireTechnicalSpec => {
  const rimMm = Number(tire.rim) * 25.4;
  const sidewallMm = tire.width * (tire.profile / 100);
  const overallDiameterMm = Math.round(rimMm + sidewallMm * 2);
  const recommendedRimWidthIn = RIM_WIDTH_BY_SECTION_WIDTH[tire.width] ?? 8;
  const treadDepthMm = TREAD_DEPTH_BY_AXLE[tire.axle];
  const { singleLoadIndex, dualLoadIndex, speedSymbol } = parseLoadSpeed(tire.loadSpeed);
  const isLowProfileRim = tire.rim === '17.5';

  return {
    sectionWidthMm: tire.width,
    sectionWidthIn: (tire.width / 25.4).toFixed(1),
    overallDiameterMm,
    overallDiameterIn: (overallDiameterMm / 25.4).toFixed(1),
    recommendedRimWidthIn,
    rimWidthRangeIn: `${(recommendedRimWidthIn - 0.75).toFixed(2)}-${(recommendedRimWidthIn + 0.75).toFixed(2)}`,
    treadDepthMm,
    treadDepth32nds: Math.round((treadDepthMm / 25.4) * 32),
    singleLoadIndex,
    dualLoadIndex,
    speedSymbol,
    maxSpeedKmh: SPEED_SYMBOL_TO_KMH[speedSymbol],
    maxLoadSingleKg: LOAD_INDEX_TO_KG[singleLoadIndex],
    maxLoadDualKg: dualLoadIndex ? LOAD_INDEX_TO_KG[dualLoadIndex] : undefined,
    maxPressurePsi: isLowProfileRim ? 110 : 120,
    maxPressureKpa: isLowProfileRim ? 760 : 830,
  };
};

const RIM_FAMILY = [17.5, 19.5, 22.5, 24.5];

export interface TireSizeRow {
  model: string;
  inch: number;
  size: string;
  liSr: string;
  code: string;
  maxPsi: number;
  maxLoadLbs: number;
  maxLoadKgs: number;
  rimWidth: string;
  rimWidthRange: string;
  sectionWidthMm: number;
  sectionWidthIn: string;
  overallDiameterMm: number;
  overallDiameterIn: string;
  treadDepthMm: string;
  treadDepth32: string;
  slrMm: number;
  sw: string;
  utqgWear: number;
  utqgTrac: string;
  utqgTemp: string;
  mPlusS: string;
}

export interface TireSizeGroup {
  name: string;
  rows: TireSizeRow[];
}

export const SIZE_TABLE_GROUPS: TireSizeGroup[] = [
  {
    name: 'ROADIAN HT',
    rows: [
      {
        model: 'ROADIAN HT',
        inch: 18,
        size: 'P245/60R18',
        liSr: '104 H',
        code: '11008',
        maxPsi: 44,
        maxLoadLbs: 1984,
        maxLoadKgs: 900,
        rimWidth: '7.0',
        rimWidthRange: '7.0~8.5',
        sectionWidthMm: 248,
        sectionWidthIn: '9.8',
        overallDiameterMm: 751,
        overallDiameterIn: '29.6',
        treadDepthMm: '9.0',
        treadDepth32: '11/32',
        slrMm: 344,
        sw: 'B/S',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 18,
        size: 'P265/70R18',
        liSr: '114 S',
        code: '11582',
        maxPsi: 44,
        maxLoadLbs: 2601,
        maxLoadKgs: 1180,
        rimWidth: '8.0',
        rimWidthRange: '7.0~9.0',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 829,
        overallDiameterIn: '32.6',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 374,
        sw: 'B/S',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 17,
        size: 'P245/65R17',
        liSr: '105 S',
        code: '14952',
        maxPsi: 44,
        maxLoadLbs: 2039,
        maxLoadKgs: 925,
        rimWidth: '7.0',
        rimWidthRange: '7.0~8.5',
        sectionWidthMm: 248,
        sectionWidthIn: '9.8',
        overallDiameterMm: 750,
        overallDiameterIn: '29.5',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 341,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 17,
        size: 'P265/65R17',
        liSr: '110 S',
        code: '11113',
        maxPsi: 44,
        maxLoadLbs: 2337,
        maxLoadKgs: 1060,
        rimWidth: '8.0',
        rimWidthRange: '7.5~9.5',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 776,
        overallDiameterIn: '30.6',
        treadDepthMm: '9.0',
        treadDepth32: '11/32',
        slrMm: 351,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 17,
        size: 'P245/70R17',
        liSr: '108 S',
        code: '14864',
        maxPsi: 44,
        maxLoadLbs: 2205,
        maxLoadKgs: 1000,
        rimWidth: '7.0',
        rimWidthRange: '6.5~8.0',
        sectionWidthMm: 248,
        sectionWidthIn: '9.8',
        overallDiameterMm: 776,
        overallDiameterIn: '30.6',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 351,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 17,
        size: 'P265/70R17',
        liSr: '113 S',
        code: '14862',
        maxPsi: 44,
        maxLoadLbs: 2535,
        maxLoadKgs: 1150,
        rimWidth: '8.0',
        rimWidthRange: '7.0~8.5',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 804,
        overallDiameterIn: '31.7',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 362,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 16,
        size: 'P275/70R16',
        liSr: '114 S',
        code: '14860',
        maxPsi: 44,
        maxLoadLbs: 2601,
        maxLoadKgs: 1180,
        rimWidth: '8.0',
        rimWidthRange: '7.0~9.0',
        sectionWidthMm: 279,
        sectionWidthIn: '11.0',
        overallDiameterMm: 792,
        overallDiameterIn: '31.2',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 354,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 16,
        size: 'P265/70R16',
        liSr: '112 S',
        code: '14857',
        maxPsi: 44,
        maxLoadLbs: 2469,
        maxLoadKgs: 1120,
        rimWidth: '8.0',
        rimWidthRange: '7.0~9.0',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 778,
        overallDiameterIn: '30.6',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 348,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 16,
        size: 'P245/70R16',
        liSr: '107 S',
        code: '14855',
        maxPsi: 44,
        maxLoadLbs: 2149,
        maxLoadKgs: 975,
        rimWidth: '7.0',
        rimWidthRange: '6.5~8.0',
        sectionWidthMm: 248,
        sectionWidthIn: '9.8',
        overallDiameterMm: 750,
        overallDiameterIn: '29.5',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 337,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 16,
        size: 'P235/70R16',
        liSr: '104 S',
        code: '14854',
        maxPsi: 44,
        maxLoadLbs: 1984,
        maxLoadKgs: 900,
        rimWidth: '7.0',
        rimWidthRange: '6.0~8.0',
        sectionWidthMm: 240,
        sectionWidthIn: '9.4',
        overallDiameterMm: 736,
        overallDiameterIn: '29.0',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 332,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 16,
        size: 'P245/75R16',
        liSr: '109 S',
        code: '14443',
        maxPsi: 44,
        maxLoadLbs: 2271,
        maxLoadKgs: 1030,
        rimWidth: '7.0',
        rimWidthRange: '6.0~8.0',
        sectionWidthMm: 248,
        sectionWidthIn: '9.8',
        overallDiameterMm: 774,
        overallDiameterIn: '30.5',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 346,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 15,
        size: 'P265/70R15',
        liSr: '110 S',
        code: '14429',
        maxPsi: 44,
        maxLoadLbs: 2337,
        maxLoadKgs: 1060,
        rimWidth: '8.0',
        rimWidthRange: '7.0~9.0',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 753,
        overallDiameterIn: '29.6',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 335,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HT',
        inch: 15,
        size: 'P255/70R15',
        liSr: '108 S',
        code: '14428',
        maxPsi: 44,
        maxLoadLbs: 2183,
        maxLoadKgs: 990,
        rimWidth: '7.5',
        rimWidthRange: '6.5~8.5',
        sectionWidthMm: 260,
        sectionWidthIn: '10.2',
        overallDiameterMm: 739,
        overallDiameterIn: '29.1',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 330,
        sw: 'R/W',
        utqgWear: 520,
        utqgTrac: 'A',
        utqgTemp: 'B',
        mPlusS: 'M',
      },
    ],
  },
  {
    name: 'ROADIAN HTX RHS',
    rows: [
      {
        model: 'ROADIAN HTX RHS',
        inch: 20,
        size: '265/50R20',
        liSr: '111 V XL',
        code: '15775',
        maxPsi: 50,
        maxLoadLbs: 2403,
        maxLoadKgs: 1090,
        rimWidth: '8.5',
        rimWidthRange: '7.5~9.5',
        sectionWidthMm: 277,
        sectionWidthIn: '10.9',
        overallDiameterMm: 774,
        overallDiameterIn: '30.5',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 358,
        sw: 'B/S',
        utqgWear: 640,
        utqgTrac: 'A',
        utqgTemp: 'A',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HTX RHS',
        inch: 18,
        size: '265/60R18',
        liSr: '110 H',
        code: '13147',
        maxPsi: 51,
        maxLoadLbs: 2337,
        maxLoadKgs: 1060,
        rimWidth: '8.0',
        rimWidthRange: '7.5~9.5',
        sectionWidthMm: 272,
        sectionWidthIn: '10.7',
        overallDiameterMm: 775,
        overallDiameterIn: '30.5',
        treadDepthMm: '9.5',
        treadDepth32: '12/32',
        slrMm: 353,
        sw: 'B/S',
        utqgWear: 640,
        utqgTrac: 'A',
        utqgTemp: 'A',
        mPlusS: 'M',
      },
      {
        model: 'ROADIAN HTX RHS',
        inch: 18,
        size: '235/60R18',
        liSr: '103 V',
        code: '13136',
        maxPsi: 51,
        maxLoadLbs: 1929,
        maxLoadKgs: 875,
        rimWidth: '7.0',
        rimWidthRange: '6.5~8.5',
        sectionWidthMm: 240,
        sectionWidthIn: '9.4',
        overallDiameterMm: 739,
        overallDiameterIn: '29.1',
        treadDepthMm: '8.7',
        treadDepth32: '11/32',
        slrMm: 339,
        sw: 'B/S',
        utqgWear: 640,
        utqgTrac: 'A',
        utqgTemp: 'A',
        mPlusS: 'M',
      },
    ],
  },
];

const gradeFromRating = (value: number) => (value >= 4 ? 'A' : value >= 3 ? 'B' : 'C');

const buildSizeRow = (tire: Tire, rim: number): TireSizeRow => {
  const rimMm = rim * 25.4;
  const sidewallMm = tire.width * (tire.profile / 100);
  const overallDiameterMm = Math.round(rimMm + sidewallMm * 2);
  const recommendedRimWidthIn = RIM_WIDTH_BY_SECTION_WIDTH[tire.width] ?? 8;
  const treadDepthMm = TREAD_DEPTH_BY_AXLE[tire.axle];
  const treadDepth32nds = Math.round((treadDepthMm / 25.4) * 32);
  const { singleLoadIndex, dualLoadIndex, speedSymbol } = parseLoadSpeed(tire.loadSpeed);
  const isLowProfileRim = rim === 17.5;
  const maxLoadKgs = LOAD_INDEX_TO_KG[singleLoadIndex] ?? 0;
  const slrMm = Math.round((overallDiameterMm / 2) * 0.96);

  return {
    model: tire.name,
    inch: rim,
    size: `${tire.width}/${tire.profile}R${rim}`,
    liSr: dualLoadIndex ? `${singleLoadIndex}/${dualLoadIndex} ${speedSymbol}` : `${singleLoadIndex} ${speedSymbol}`,
    code: String(11000 + tire.width + Math.round(rim * 10) + singleLoadIndex),
    maxPsi: isLowProfileRim ? 110 : 120,
    maxLoadLbs: Math.round(maxLoadKgs * 2.2046),
    maxLoadKgs,
    rimWidth: recommendedRimWidthIn.toFixed(1),
    rimWidthRange: `${(recommendedRimWidthIn - 0.75).toFixed(1)}-${(recommendedRimWidthIn + 0.75).toFixed(1)}`,
    sectionWidthMm: tire.width,
    sectionWidthIn: (tire.width / 25.4).toFixed(1),
    overallDiameterMm,
    overallDiameterIn: (overallDiameterMm / 25.4).toFixed(1),
    treadDepthMm: treadDepthMm.toFixed(1),
    treadDepth32: `${treadDepth32nds}/32`,
    slrMm,
    sw: tire.axle === 'Drive' || tire.axle === 'Bus/Coach' ? 'B/S' : 'R/W',
    utqgWear: Math.round(300 + tire.performance.wear * 70),
    utqgTrac: gradeFromRating(tire.performance.wet),
    utqgTemp: gradeFromRating(tire.performance.durability),
    mPlusS: tire.performance.snow >= 3 ? 'M' : '—',
  };
};

export const getSizeTableRows = (tire: Tire): TireSizeRow[] => {
  const baseRim = Number(tire.rim);
  const familyIndex = RIM_FAMILY.indexOf(baseRim);
  const rims =
    familyIndex === -1
      ? [baseRim]
      : RIM_FAMILY.filter((_, index) => Math.abs(index - familyIndex) <= 1);

  return rims.map((rim) => buildSizeRow(tire, rim));
};

export const getTireById = (id: string): Tire | undefined => TIRES.find((tire) => tire.id === id);

export const getRelatedTires = (tire: Tire, limit = 3): Tire[] =>
  TIRES.filter((item) => item.id !== tire.id && item.axle === tire.axle).slice(0, limit);
