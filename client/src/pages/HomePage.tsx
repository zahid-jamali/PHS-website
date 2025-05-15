import Hero from '@/components/home/Hero';
import USPSection from '@/components/home/USPSection';
import AboutSection from '@/components/home/AboutSection';
import SaltLampsShowcase from '@/components/home/SaltLampsShowcase';
import WholesaleSection from '@/components/home/WholesaleSection';
import HalotherapySection from '@/components/home/HalotherapySection';
import MarketplaceIntegrations from '@/components/home/MarketplaceIntegrations';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';
import ContactSection from '@/components/home/ContactSection';
import CTASection from '@/components/home/CTASection';
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Dr. Abdul PHS - Premium Pink Himalayan Salt</title>
        <meta 
          name="description" 
          content="Experience the purest Pink Himalayan Salt, responsibly sourced from ancient salt mines in Pakistan and delivered to your doorstep. Shop premium culinary, therapeutic, and home decor salt products."
        />
        <meta name="keywords" content="Pink Himalayan Salt, wholesale salt, halotherapy, salt therapy, Dr. Abdul PHS, culinary salt, therapeutic salt, salt lamps" />
      </Helmet>
      
      <Hero />
      <USPSection />
      <AboutSection />
      <SaltLampsShowcase />
      <WholesaleSection />
      <HalotherapySection />
      <MarketplaceIntegrations />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
