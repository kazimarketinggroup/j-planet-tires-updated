import UpdatedHeroSection from './UpdatedHeroSection';
import TireRangeSection from './TireRangeSection';
import AboutSection from './AboutSection';
import WhyChooseSection from './WhyChooseSection';
import WorkWithSection from './WorkWithSection';
import BuildProgrammeSection from './BuildProgrammeSection';
import SustainabilitySection from './SustainabilitySection';
import CtaBannerSection from './CtaBannerSection';
import WhereWeOperateSection from './WhereWeOperateSection';
import NewsSection from './NewsSection';
import Head from '@/Components/Shared/Head';

const Home = () => {
    return (
        <div>
            <Head title="J.Planet Tire | PCR & TBR Tires for Fleets & Trade" description=' J.Planet Tire manufactures PCR and TBR tires for fleets, distributors, and trade partners across Europe, the Middle East, Africa, and Asia.' />
            <UpdatedHeroSection />
            <TireRangeSection />
            <AboutSection />
            <WhyChooseSection />
            <WorkWithSection />
            <BuildProgrammeSection />
            <SustainabilitySection />
            <CtaBannerSection />
            <WhereWeOperateSection />
            <NewsSection />
        </div>
    );
};

export default Home;
