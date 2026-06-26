"use client";

import { useState } from "react";
import { email, packages } from "../lib/content";
import { trackEvent } from "../lib/analytics";

function mailtoFor(subject) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function detailRows(offer) {
  return [
    ["Best when", offer.pathOutcome],
    ["Kai handles", offer.includes[0]],
    ["You leave with", offer.board.outcome],
  ];
}

export default function PackagesSection() {
  const [active, setActive] = useState(0);
  const offer = packages[active];

  function selectOffer(index) {
    setActive(index);
    trackEvent("package_path_select", {
      package_name: packages[index].name,
      package_path: packages[index].path,
    });
  }

  return (
    <section className="section packages-section" id="packages">
      <div className="offer-heading">
        <div>
          <span className="sec-eyebrow mono">Ways to work together</span>
          <h2 className="sec-title">
            Get unstuck without hiring <span className="mut">a whole committee.</span>
          </h2>
        </div>
        <p className="offer-lede">
          Start with a clear read, ship the stuck piece, build the brand and digital layer,
          or keep Kai close so the good work keeps moving.
        </p>
      </div>

      <div className="offers-shell">
        <div className="offers-grid" role="tablist" aria-label="Ways to work with Kai">
          {packages.map((item, index) => (
            <button
              className={`offer-tile${index === active ? " on" : ""}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="package-detail"
              key={item.name}
              onClick={() => selectOffer(index)}
            >
              <span className="offer-tile-top">
                <span className="offer-index mono">{String(index + 1).padStart(2, "0")}</span>
                <span className="package-range mono">{item.range}</span>
              </span>
              <span className="offer-path mono">{item.path}</span>
              <strong>{item.name}</strong>
              <small>{item.pathTitle}</small>
            </button>
          ))}
        </div>

        <article className="offer-detail" id="package-detail" role="tabpanel" aria-live="polite" key={offer.name}>
          <div className="offer-detail-head">
            <span className="package-eyebrow mono">{offer.eyebrow}</span>
            <span className="package-range mono">{offer.range}</span>
          </div>

          <h3>{offer.name}</h3>
          <p className="offer-summary">{offer.summary}</p>

          <div className="offer-focus" aria-label="Typical work areas">
            <span>Brand</span>
            <span>Website</span>
            <span>Workflow</span>
            <span>Tracking</span>
          </div>

          <div className="offer-mini-grid">
            {detailRows(offer).map(([label, text]) => (
              <div className="offer-mini" key={label}>
                <span className="mono">{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="offer-stack">
            <span className="offer-stack-label mono">Typical scope</span>
            <ul className="package-includes">
              {offer.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <a
            className="btn primary package-cta"
            href={mailtoFor(offer.subject)}
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
      </div>
    </section>
  );
}
