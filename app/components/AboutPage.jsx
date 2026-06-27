import Image from "next/image";
import { about, meetingUrl } from "../lib/content";
import Closing from "./Closing";
import Header from "./Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page" id="about">
        <section className="about-hero">
          <div className="about-copy">
            <span className="eyebrow">
              <span className="tick" />
              {about.eyebrow}
            </span>
            <h1>{about.title}</h1>
            <p className="lede">{about.lede}</p>
            <div className="about-body">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="ctas">
              <a className="btn primary" href={meetingUrl} target="_blank" rel="noreferrer">
                Book a call
              </a>
              <a className="btn ghost" href="/#projects">
                See built work
              </a>
            </div>
          </div>

          <figure className="about-portrait">
            <Image
              src={about.portrait}
              alt="Kai Perez standing with arms crossed against a light wall."
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 920px) 82vw, 34vw"
            />
            <figcaption className="mono">Technical operator / Los Angeles</figcaption>
          </figure>
        </section>

        <section className="about-notes" aria-label="How Kai works">
          {about.signals.map((signal) => (
            <article className="about-note" key={signal.label}>
              <span className="sec-eyebrow mono">{signal.label}</span>
              <p>{signal.text}</p>
            </article>
          ))}
        </section>
      </main>
      <Closing />
    </>
  );
}
