import Head from '@/Components/Shared/Head';
import CtaBannerSection from '../Home/CtaBannerSection';
import AboutHeroSection from './AboutHeroSection';
import ManufacturingSection from './ManufacturingSection';
import MilestonesSection from './MilestonesSection';
import MissionSection from './MissionSection';
import SubSection from './SubSection';

const About = () => {
  return (
    <div>
      <Head
        title="About J.Planet Tire | PCR & TBR Manufacturer"
        description="Learn about J.Planet Tire, an independent PCR and TBR tire manufacturer serving fleets, distributors, and trade partners across Europe, the Middle East, Africa, and Asia."
      />
      <AboutHeroSection />
      <MissionSection />
      <ManufacturingSection />
      <MilestonesSection />
      <SubSection/>
      <CtaBannerSection />
    </div>
  );
};

export default About;
