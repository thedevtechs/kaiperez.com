import { caseStudies } from "../lib/content";

export default function WorkSection() {
  return (
    <section className="section results-section" id="work">
      <div className="sec-head">
        <span className="sec-eyebrow mono">Representative outcomes</span>
        <h2 className="sec-title">
          The kind of movement <span className="mut">clients hire for.</span>
        </h2>
      </div>

      <div className="results-band">
        {caseStudies.map((study) => (
          <article className="result-card" key={study.name}>
            <div className="result-top">
              <span className="tag mono">{study.tag}</span>
              <span className="sector">{study.sector}</span>
            </div>
            <div className="result-metric">
              <span className="big">{study.metric}</span>
              <span className="lbl mono">{study.label}</span>
            </div>
            <h3>{study.name}</h3>
            <p>{study.problem}</p>
            <p className="result-move">{study.built[0]}</p>
            <div className="result-note mono">{study.note}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
