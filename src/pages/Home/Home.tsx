import FeatureHome from '@/components/FeaturesHome/FeatureHome';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CtaSection from '@/components/CTASection/CtaSection';
import Statistics from '@/components/Statistics/Statistics';
import Categories from '@/components/Categories/Categories';
import Services from '@/components/Services/Services';
import Highlights from '@/components/Highlights/Highlights';
import Offer from '@/components/Offer/Offer';
import Testimonials from '@/components/Testimonials/Testimonials';
import Newaletter from '@/components/Newsletter/Newaletter';
import Blogs from '@/components/Blogs/Blogs';
import FAQ from '@/components/FAQ/FAQ';

const Home = () => {
  return (
    <div className='bg-gray-50 dark:bg-gray-900'>
      <HeroBanner />

      {/* Features Preview Section */}
      <FeatureHome />

      {/* Categories Section */}
      <Categories />

      {/* Services Section */}
      <Services />

      {/* Statistics Section */}
      <Statistics />

      {/* Highlights Section */}
      <Highlights />

      {/* Offers Section */}
      <Offer />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newaletter />

      {/* Blogs Section */}
      <Blogs />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Home;
