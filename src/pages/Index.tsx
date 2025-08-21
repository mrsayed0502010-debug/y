import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QuranSection from '@/components/QuranSection';
import AzkarSection from '@/components/AzkarSection';
import TasbihSection from '@/components/TasbihSection';
import PrayerSection from '@/components/PrayerSection';
import DuasSection from '@/components/DuasSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <QuranSection />
      <AzkarSection />
      <TasbihSection />
      <PrayerSection />
      <DuasSection />
      <Footer />
    </div>
  );
};

export default Index;
