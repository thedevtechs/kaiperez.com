"use client";

import { useEffect, useState } from "react";
import { references } from "../lib/content";

const groupSize = 2;
const intervalMs = 5600;
const referenceGroups = Array.from({ length: Math.ceil(references.length / groupSize) }, (_, index) =>
  references.slice(index * groupSize, index * groupSize + groupSize)
);

function QuoteCard({ reference }) {
  return (
    <figure className="quote">
      <div className="mark">-</div>
      <h3 className="voice-theme">{reference.theme}</h3>
      <p>{reference.quote}</p>
      <figcaption className="by">
        <span className="avatar mono">{reference.id}</span>
        <span>
          <span className="nm">{reference.scope}</span>
          <span className="rl">Anonymized pattern from senior engagements</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function VoicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion || referenceGroups.length < 2) return undefined;

    const id = window.setTimeout(() => {
      setActive((value) => (value + 1) % referenceGroups.length);
    }, intervalMs);

    return () => window.clearTimeout(id);
  }, [active, paused]);

  function move(direction) {
    setActive((value) => (value + direction + referenceGroups.length) % referenceGroups.length);
  }

  return (
    <section
      className="section"
      data-carousel-active={active}
      data-carousel-paused={paused}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="sec-head">
        <span className="sec-eyebrow mono">02 - Reference themes</span>
        <h2 className="sec-title">
          Why teams <span className="mut">call Kai.</span>
        </h2>
        <div className="carousel-controls">
          <button className="carousel-button" type="button" aria-label="Previous testimonials" onClick={() => move(-1)}>
            <span aria-hidden="true">&lt;</span>
          </button>
          <button className="carousel-button" type="button" aria-label="Next testimonials" onClick={() => move(1)}>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      </div>

      <div className="voices-carousel" aria-live="polite">
        <div className="voices-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {referenceGroups.map((group, index) => (
            <div className="voices" role="group" aria-label={`Testimonials ${index + 1} of ${referenceGroups.length}`} key={group[0].id}>
              {group.map((reference) => (
                <QuoteCard reference={reference} key={reference.id} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {referenceGroups.map((group, index) => (
          <button
            className={`carousel-dot${index === active ? " on" : ""}`}
            type="button"
            aria-label={`Show testimonials ${index + 1}`}
            aria-current={index === active}
            key={group[0].id}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
