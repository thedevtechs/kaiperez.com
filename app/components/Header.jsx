import { meetingUrl } from "../lib/content";

export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        <div className="monogram">KP</div>
        <div className="who">
          <b>Kai Perez</b>
          <span className="mono">Founder-Operator</span>
        </div>
      </a>
      <nav className="topnav" aria-label="Primary navigation">
        <a href="/#inquiry">Start a project</a>
        <a href="/#work">Proof</a>
        <a href="/#packages">Ways in</a>
        <a href="/about">About</a>
      </nav>
      <a className="nav-cta" href={meetingUrl} target="_blank" rel="noreferrer">
        Book a call
      </a>
      <a className="mobile-meeting-cta" href={meetingUrl} target="_blank" rel="noreferrer">
        Book a call
      </a>
    </header>
  );
}
