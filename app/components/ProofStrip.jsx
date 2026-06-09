import { proofStrip } from "../lib/content";

export default function ProofStrip() {
  return (
    <div className="proofwrap">
      <div className="proof-strip">
        <span className="proof-label mono">{proofStrip.title}</span>
        <div className="proof-items">
          {proofStrip.items.map((item, index) => (
            <span className="proof-item" key={item}>
              <span className="proof-index mono">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
