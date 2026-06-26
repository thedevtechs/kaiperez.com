import { proofStrip } from "../lib/content";

export default function ProofStrip() {
  return (
    <div className="proofwrap">
      <div className="proof-strip">
        <div className="proof-kicker">
          <span className="proof-label mono">{proofStrip.title}</span>
          <strong>Range that shows up in the work, not just the pitch.</strong>
        </div>
        <div className="proof-items" aria-label="Kai proof points">
          {proofStrip.items.map((item, index) => (
            <span className="proof-item" key={item}>
              <span className="proof-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
