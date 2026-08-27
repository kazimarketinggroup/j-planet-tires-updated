import Head from '@/Components/Shared/Head';
import ContactFormSection from './ContactFormSection';
import ContactHeroSection from './ContactHeroSection';

const Contact = () => {
  return (
    <div>
      <Head
        title="Contact J.Planet Tire | Trade Enquiries"
        description="Get in touch with J.Planet Tire for trade, fleet, distributor, and tire fitment enquiries across global markets."
      />
      <ContactHeroSection />
      <ContactFormSection />
    </div>
  );
};

export default Contact;
