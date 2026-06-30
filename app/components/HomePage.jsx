// AuditCaptureSection is intentionally parked until the capture path is connected.
// import AuditCaptureSection from "./AuditCaptureSection";
import Closing from "./Closing";
import CredibilitySection from "./CredibilitySection";
import Header from "./Header";
import Hero from "./Hero";
import NamedProofSection from "./NamedProofSection";
import PackagesSection from "./PackagesSection";
import ProofStrip from "./ProofStrip";
import WorkSection from "./WorkSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProofStrip />
      <NamedProofSection />
      {/* <AuditCaptureSection /> */}
      <WorkSection />
      <PackagesSection />
      <CredibilitySection />
      <Closing />
    </>
  );
}
