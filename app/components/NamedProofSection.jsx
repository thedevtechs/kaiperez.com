"use client";

import { useEffect, useState } from "react";
import { namedProofProjects } from "../lib/content";
import { trackEvent } from "../lib/analytics";

const rotationDelay = 6500;

export default function NamedProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % namedProofProjects.length);
    }, rotationDelay);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section named-proof-section" id="projects">
      <div className="named-proof-carousel" aria-live="polite">
        <div
          className="named-proof-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {namedProofProjects.map((project, index) => (
            <article
              className="named-proof-card"
              aria-hidden={index !== activeIndex}
              key={project.id}
            >
              <div className="named-proof-main">
                <span className="sec-eyebrow mono">{project.eyebrow}</span>
                <div className="named-proof-title-row">
                  <h2>{project.name}</h2>
                  <span className="mono">{project.tag}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.lede}</p>
                <a
                  className="named-proof-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() =>
                    trackEvent("named_proof_click", {
                      project_name: project.name,
                    })
                  }
                >
                  {project.cta}
                </a>
              </div>

              <div className="named-proof-outcome">
                <span className="project-proof-label mono">Outcome</span>
                <p>{project.outcome}</p>
              </div>

              <div className="named-proof-grid">
                {project.proofPoints.map((point) => (
                  <div key={point.label}>
                    <span className="mono">{point.label}</span>
                    <p>{point.text}</p>
                  </div>
                ))}
              </div>

              <p className="named-proof-why">{project.whyItMatters}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="named-proof-controls" aria-label="Choose a built system">
        {namedProofProjects.map((project, index) => (
          <button
            className={`named-proof-control${index === activeIndex ? " active" : ""}`}
            type="button"
            aria-label={`Show ${project.name}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            key={project.id}
          >
            <span className="mono">{String(index + 1).padStart(2, "0")}</span>
            {project.name}
          </button>
        ))}
      </div>
    </section>
  );
}
