"use client";

import { meetingUrl, projects } from "../lib/content";
import { trackEvent } from "../lib/analytics";

function projectHref(project) {
  if (project.url) {
    return project.url;
  }

  return meetingUrl;
}

export default function ProjectsSection() {
  return (
    <section className="section projects-section" id="projects">
      <div className="sec-head project-head">
        <span className="sec-eyebrow mono">Built solutions</span>
        <h2 className="sec-title">
          Systems, storefronts, and <span className="mut">automations in motion.</span>
        </h2>
        <p className="section-lede">
          A few examples of the work: call routing, intake queues, commerce cleanup, planning tools, and brand-forward storefronts.
        </p>
      </div>

      <div className="project-cards">
        {projects.map((project, index) => {
          const href = projectHref(project);
          const isExternal = Boolean(project.url) || href === meetingUrl;

          return (
            <article className="project-card" key={project.name}>
              <div className="project-card-top">
                <span className="project-index mono">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-tag mono">{project.tag}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-outcome">{project.outcome}</p>

              <div className="project-card-proof">
                <span className="project-proof-label mono">Proof signal</span>
                <p>{project.evidence}</p>
              </div>

              <div className="project-tags" aria-label={`${project.name} tags`}>
                {project.tags.slice(0, 3).map((tag) => (
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
