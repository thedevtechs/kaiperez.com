import { email } from "../lib/content";
import EmailButton from "./EmailButton";

export default function Closing() {
  return (
    <section className="section closing">
      <h2>
        Bring the weird internet <em>knot.</em>
      </h2>
      <p>
        The brand that feels off, the storefront that should sell better, the workflow everyone
        avoids, the half-built thing with potential. Kai will find the shape of it and get the next
        move shipped.
      </p>
      <div className="ctas">
        <a className="btn primary" href={`mailto:${email}?subject=Let's%20build%20something`}>
          Start a conversation
        </a>
        <EmailButton />
      </div>
      <div className="closing-status mono">
        <span className="dot" />
        Selective projects / Remote
      </div>
    </section>
  );
}
