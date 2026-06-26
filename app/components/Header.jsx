export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        <div className="monogram">KP</div>
        <div className="who">
          <b>Kai Perez</b>
          <span className="mono">Technical Operator</span>
        </div>
      </a>
      <nav className="topnav" aria-label="Primary navigation">
        <a href="/#packages">Ways in</a>
        <a href="/#projects">Proof</a>
        <a href="/about">About</a>
      </nav>
      <div className="status mono">
        <span className="dot" />
        Selective projects
      </div>
    </header>
  );
}
