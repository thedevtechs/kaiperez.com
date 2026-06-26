"use client";

import { useState } from "react";
import { email, projects } from "../lib/content";
import { trackEvent } from "../lib/analytics";

const lenses = [
  { id: "outcome", label: "Proof" },
  { id: "changed", label: "What changed" },
  { id: "hire", label: "Hire fit" },
];

function projectHref(project) {
  if (project.url) {
    return project.url;
  }

  return `mailto:${email}?subject=${encodeURIComponent(project.subject)}`;
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [activeLens, setActiveLens] = useState("outcome");
  const project = projects[active];
  const href = projectHref(project);
  const isExternal = Boolean(project.url);

  function selectProject(index) {
    setActive(index);
    trackEvent("project_select", {
      project_name: projects[index].name,
      project_url: projects[index].url || "private",
    });
  }

  function selectLens(lensId) {
    setActiveLens(lensId);
    trackEvent("project_lens_select", {
      project_name: project.name,
      lens: lensId,
    });
  }

  function handleProjectKeyDown(event, index) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + projects.length) % projects.length;
    selectProject(nextIndex);
  }

  return (
    <section className="section projects-section" id="projects">
      <div className="sec-head project-head">
        <span className="sec-eyebrow mono">02 - Project proof</span>
        <h2 className="sec-title">
          Proof from work <span className="mut">already in the wild.</span>
        </h2>
      </div>

      <div className="project-deck">
        <div className="project-switcher" role="tablist" aria-label="Project proof selector">
          {projects.map((item, index) => (
            <button
              className={`project-tab${index === active ? " on" : ""}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="project-detail"
              data-project-tab={item.name}
              key={item.name}
              onClick={() => selectProject(index)}
              onKeyDown={(event) => handleProjectKeyDown(event, index)}
            >
              <span className="project-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span className="project-tab-copy">
                <span className="project-tag mono">{item.tag}</span>
                <strong>{item.name}</strong>
                <small>{item.outcome}</small>
              </span>
            </button>
          ))}
        </div>

        <article className="project-stage" id="project-detail" role="tabpanel" aria-live="polite" key={project.name}>
          <div className="project-stage-top">
            <div>
              <span className="project-tag mono">{project.tag}</span>
              <h3>{project.name}</h3>
            </div>
            <span className="project-count mono">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="project-lenses" role="tablist" aria-label={`${project.name} project lens`}>
            {lenses.map((lens) => (
              <button
                className={`project-lens${lens.id === activeLens ? " on" : ""}`}
                type="button"
                role="tab"
                aria-selected={lens.id === activeLens}
                aria-controls="project-lens-panel"
                data-project-lens={lens.id}
                key={lens.id}
                onClick={() => selectLens(lens.id)}
              >
                {lens.label}
              </button>
            ))}
          </div>

          <div className="project-stage-grid">
            <div className="project-lens-panel" id="project-lens-panel" role="tabpanel" key={`${project.name}-${activeLens}`}>
              {activeLens === "outcome" && (
                <>
                  <span className="project-meta-label mono">Business result</span>
                  <p className="project-outcome">{project.outcome}</p>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-proof-grid">
                    <div>
                      <span className="project-proof-label mono">Before</span>
                      <p>{project.before}</p>
                    </div>
                    <div>
                      <span className="project-proof-label mono">Kai changed</span>
                      <p>{project.kai}</p>
                    </div>
                    <div>
                      <span className="project-proof-label mono">Proof signal</span>
                      <p>{project.evidence}</p>
                    </div>
                  </div>
                </>
              )}

              {activeLens === "changed" && (
                <>
                  <span className="project-meta-label mono">What changed</span>
                  <ul className="project-proof-list">
                    {project.changed.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeLens === "hire" && (
                <>
                  <span className="project-meta-label mono">Hire Kai when you need to</span>
                  <ul className="project-proof-list">
                    {project.proves.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="project-meta">
              <span className="project-meta-label mono">Signals</span>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-chip mono" key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="project-link"
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                onClick={() =>
                  trackEvent("project_link_click", {
                    project_name: project.name,
                    project_url: project.url || "private",
                  })
                }
              >
                {project.cta || "View project"}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
