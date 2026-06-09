import Closing from "./Closing";
import Header from "./Header";
import Hero from "./Hero";
import ProofStrip from "./ProofStrip";
import VoicesSection from "./VoicesSection";
import WorkSection from "./WorkSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProofStrip />
      <WorkSection />
      <VoicesSection />
      <Closing />
    </>
  );
}
