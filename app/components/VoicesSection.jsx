import { references } from "../lib/content";

function ReferenceRow({ reference }) {
  return (
    <article className="reference-row">
      <span className="reference-id mono">{reference.id}</span>
      <div className="reference-copy">
        <h3>{reference.theme}</h3>
        <p>{reference.quote}</p>
      </div>
      <span className="reference-source">{reference.scope}</span>
    </article>
  );
}

export default function VoicesSection() {
  return (
    <div className="reference-ledger" aria-label="Reference patterns">
      <div className="reference-ledger-head">
        <span className="mono">Reference pattern</span>
        <p>What people should be able to confirm after the work.</p>
      </div>
      <div className="reference-rows">
        {references.map((reference) => (
          <ReferenceRow reference={reference} key={reference.id} />
        ))}
      </div>
    </div>
  );
}
