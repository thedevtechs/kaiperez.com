import { email } from "../lib/content";
import EmailButton from "./EmailButton";

export default function Closing() {
  return (
    <section className="section closing">
      <h2>
        Got something expensive, messy, or <em>stuck?</em>
      </h2>
      <p>
        Bring Kai the business constraint, technical uncertainty, or stalled initiative.
        He will clarify the path, name the tradeoffs, and help drive the next serious move.
      </p>
      <div className="ctas">
        <a className="btn primary" href={`mailto:${email}?subject=Let's%20build%20something`}>
          Start a conversation
        </a>
        <EmailButton />
      </div>
      <div className="closing-status mono">
        <span className="dot" />
        Selective availability / Remote
      </div>
    </section>
  );
}
