import Head from '@/Components/Shared/Head';
import FeaturedNewsSection from './FeaturedNewsSection';
import NewsGridSection from './NewsGridSection';
import NewsHeroSection from './NewsHeroSection';

const News = () => {
  return (
    <div>
      <Head
        title="News & Media | J.Planet Tire"
        description="Read the latest news, exhibitions, and media updates from J.Planet Tire, including global trade events and product innovation highlights."
      />
      <NewsHeroSection />
      <FeaturedNewsSection />
      <NewsGridSection />
    </div>
  );
};

export default News;
