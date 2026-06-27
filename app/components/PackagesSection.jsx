"use client";

import { meetingUrl, packages } from "../lib/content";
import { trackEvent } from "../lib/analytics";

function packagePoints(offer) {
  return [
    ["Good for", offer.pathOutcome],
    ["You leave with", offer.board.outcome],
  ];
}

export default function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <div className="offer-heading">
        <div>
          <span className="sec-eyebrow mono">Ways to work together</span>
          <h2 className="sec-title">
            Start clear. Ship the thing. <span className="mut">Keep it working.</span>
          </h2>
        </div>
        <p className="offer-lede">
          Four clean ways in, from a practical audit to a full brand and digital buildout.
        </p>
      </div>

      <div className="package-cards">
        {packages.map((offer, index) => (
          <article className={`package-card${offer.featured ? " featured" : ""}`} key={offer.name}>
            <div className="package-card-top">
              <span className="offer-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span className="package-range mono">{offer.range}</span>
            </div>
            <span className="package-eyebrow mono">{offer.eyebrow}</span>
            <h3>{offer.name}</h3>
            <p className="offer-summary">{offer.summary}</p>

            <div className="package-point-list">
              {packagePoints(offer).map(([label, text]) => (
                <div className="package-point" key={label}>
                  <span className="mono">{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <a
              className="package-link"
              href={meetingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("package_cta_click", {
                  package_name: offer.name,
                  package_range: offer.range,
                })
              }
            >
              {offer.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
