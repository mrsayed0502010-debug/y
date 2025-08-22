import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QuranSection from '@/components/QuranSection';
import AzkarSection from '@/components/AzkarSection';
import TasbihSection from '@/components/TasbihSection';
import PrayerSection from '@/components/PrayerSection';
import DuasSection from '@/components/DuasSection';
import Footer from '@/components/Footer';
import ShortcutBar from '@/components/ShortcutBar';
import NotificationSystem from '@/components/NotificationSystem';

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
      <ShortcutBar />
      <NotificationSystem />
    </div>
  );
};

export default Index;
