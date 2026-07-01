import Image from "next/image";
import { creativeShowcase } from "../lib/content";

export default function CreativeShowcaseSection() {
  return (
    <section className="section creative-showcase-section" id="creative">
      <div className="creative-showcase-shell">
        <a
          className="creative-preview"
          href={creativeShowcase.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${creativeShowcase.name} live concept`}
        >
          <Image
            src={creativeShowcase.image}
            alt={creativeShowcase.imageAlt}
            width={1280}
            height={720}
            sizes="(max-width: 920px) 100vw, 54vw"
          />
          <div className="creative-preview-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="creative-preview-title">
            <span className="mono">{creativeShowcase.tag}</span>
            <strong>{creativeShowcase.name}</strong>
          </div>
        </a>

        <div className="creative-showcase-copy">
          <span className="sec-eyebrow mono">{creativeShowcase.eyebrow}</span>
          <h2>{creativeShowcase.title}</h2>
          <p>{creativeShowcase.lede}</p>
          <ul className="creative-showcase-notes" aria-label="Creative concept highlights">
            {creativeShowcase.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <a className="creative-showcase-link" href={creativeShowcase.url} target="_blank" rel="noreferrer">
            {creativeShowcase.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
