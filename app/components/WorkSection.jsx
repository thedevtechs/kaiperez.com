import { caseStudies } from "../lib/content";

export default function WorkSection() {
  return (
    <section className="section results-section" id="work">
      <div className="sec-head">
        <span className="sec-eyebrow mono">Outcome proof</span>
        <h2 className="sec-title">
          The work that makes founders <span className="mut">feel the difference.</span>
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
            <ul className="result-built">
              {study.built.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="result-note mono">{study.note}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
