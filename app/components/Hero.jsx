"use client";

import { useEffect, useState } from "react";
import { capabilities, hero } from "../lib/content";
import EmailButton from "./EmailButton";
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

        <div className="panel" key={current.key}>
          <div className="swap">
            <div className="panel-head">
              <span className="idx mono">{String(active + 1).padStart(2, "0")} / 0{capabilities.length}</span>
              <span className="cat mono">{current.category}</span>
            </div>
            <h2 className="tagline">{current.tagline}</h2>
            <p className="desc">{current.description}</p>
            <div className="proofrow">
              <div className="proof">
                <span className="pip" />
                {current.proof}
              </div>
              <a className="casestudy" href="#work">View case study</a>
            </div>
          </div>
        </div>

        <div className="ctas">
          <a className="btn primary" href="#work">See his work</a>
          <EmailButton />
        </div>
      </section>

      <section className="stage">
        <ToolWheel active={active} onSelect={setActive} />
        <div className="chips">
          {capabilities.map((capability, index) => (
            <button
              key={capability.key}
              className={`chip${index === active ? " on" : ""}${index === active && !paused ? " timing" : ""}`}
              style={{ "--dur": `${intervalMs}ms` }}
              type="button"
              onClick={() => setActive(index)}
            >
              <span className="num mono">{String(index + 1).padStart(2, "0")}</span>
              {capability.short}
              <span className="fill" key={`${active}-${index}`} />
            </button>
          ))}
        </div>
      </section>

      <a className="scrollcue mono" href="#work">
        Scroll for proof
        <span className="ar">v</span>
      </a>
    </main>
  );
}
