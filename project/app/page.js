import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import HandpickedTreasures from '@/components/HandpickedTreasures';
import StoriesSection from '@/components/StoriesSection';
import ZaryahWaySection from '@/components/ZaryahWaySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategorySection />
      <HandpickedTreasures />
      <StoriesSection />
      <ZaryahWaySection />
      <Footer />
    </main>
  );
}