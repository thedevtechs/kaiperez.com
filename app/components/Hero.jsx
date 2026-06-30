"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { capabilities, hero, heroAuthority } from "../lib/content";
import ToolWheel from "./ToolWheel";

const intervalMs = 4200;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = capabilities[active];

  useEffect(() => {
    if (paused) return undefined;

    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % capabilities.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <main className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <section className="left">
        <div className="eyebrow mono">
          <span className="tick" />
          {hero.eyebrow}
        </div>
        <h1>
          {hero.title} <em>{hero.titleAccent}</em>
        </h1>
        <p className="lede">{hero.lede}</p>
        <div className="hero-focus-list" aria-label="Kai working range">
          {hero.focus.map((item) => (
            <div className="hero-focus-item" key={item.label}>
              <span className="mono">{item.label}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="ctas">
          <a className="btn primary" href="#inquiry">Start a project</a>
          <a className="btn ghost" href="#packages">Ways to work</a>
        </div>
      </section>

      <section className="stage">
        <ToolWheel active={active} onSelect={setActive} />
        <aside className="hero-authority" aria-label="About Kai Perez">
          <Image
            src={heroAuthority.portrait}
            alt="Kai Perez standing with arms crossed."
            width={96}
            height={96}
            priority
          />
          <div>
            <div className="hero-authority-top">
              <strong>{heroAuthority.name}</strong>
              <span className="mono">{heroAuthority.location}</span>
            </div>
            <p>{heroAuthority.line}</p>
            <div className="hero-authority-chips" aria-label="Kai focus areas">
              {heroAuthority.chips.map((chip) => (
                <span className="mono" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </aside>
        <div className="stage-caption" key={current.key}>
          <span className="mono">{current.short}</span>
          <strong>{current.tagline}</strong>
        </div>
      </section>
    </main>
  );
}
