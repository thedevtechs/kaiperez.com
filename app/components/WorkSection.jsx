import { caseStudies } from "../lib/content";

export default function WorkSection() {
  return (
    <section className="section results-section" id="work">
      <div className="sec-head">
        <span className="sec-eyebrow mono">03 - Representative outcomes</span>
        <h2 className="sec-title">
          The fix, the move, <span className="mut">and the signal.</span>
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
            <div className="result-block">
              <span className="result-label mono">Before</span>
              <p>{study.problem}</p>
            </div>
            <div className="result-block">
              <span className="result-label mono">What Kai changed</span>
              <ul className="built">
                {study.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="result-note mono">{study.note}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
