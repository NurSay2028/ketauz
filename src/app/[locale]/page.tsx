import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { TechStack } from '@/components/sections/TechStack';
import { Stats } from '@/components/sections/Stats';
import { Timeline } from '@/components/sections/Timeline';
import { Team } from '@/components/sections/Team';
import { Investor } from '@/components/sections/Investor';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <TechStack />
      <Stats />
      <Timeline />
      <Team />
      <Investor />
      <Contact />
      <Footer />
    </main>
  );
}
