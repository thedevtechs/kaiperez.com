import { caseStudies } from "../lib/content";

export default function WorkSection() {
  return (
    <section className="section" id="work">
      <div className="sec-head">
        <span className="sec-eyebrow mono">01 - Representative engagements</span>
        <h2 className="sec-title">
          Senior technical judgment <span className="mut">under real pressure.</span>
        </h2>
      </div>

      <div className="work-grid">
        {caseStudies.map((study) => (
          <article className="case" key={study.name}>
            <div className="tag mono">{study.tag}</div>
            <h3>{study.name}</h3>
            <div className="sector">{study.sector}</div>
            <p className="problem">{study.problem}</p>
            <ul className="built">
              {study.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="metric">
              <span className="big">{study.metric}</span>
              <span className="lbl mono">{study.label}</span>
            </div>
            <p className="sub mono">{study.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
