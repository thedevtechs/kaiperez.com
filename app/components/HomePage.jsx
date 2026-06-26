import Closing from "./Closing";
import Header from "./Header";
import Hero from "./Hero";
import PackagesSection from "./PackagesSection";
import ProofStrip from "./ProofStrip";
import ProjectsSection from "./ProjectsSection";
import VoicesSection from "./VoicesSection";
import WorkSection from "./WorkSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProofStrip />
      <PackagesSection />
      <ProjectsSection />
      <WorkSection />
      <VoicesSection />
      <Closing />
    </>
  );
}
