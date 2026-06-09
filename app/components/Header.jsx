export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="monogram">KP</div>
        <div className="who">
          <b>Kai Perez</b>
          <span className="mono">Technical Operator</span>
        </div>
      </div>
      <div className="status mono">
        <span className="dot" />
        Selective availability
      </div>
    </header>
  );
}
