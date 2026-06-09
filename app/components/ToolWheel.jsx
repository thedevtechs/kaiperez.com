import { capabilities } from "../lib/content";

const pivot = { x: 320, y: 470 };
const radius = 240;
const spread = 62;

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}

function angleFor(index) {
  return -spread + index * ((spread * 2) / (capabilities.length - 1));
}

function arcPath(size, start, end) {
  const p0 = {
    x: pivot.x + size * Math.sin(radians(start)),
    y: pivot.y - size * Math.cos(radians(start)),
  };
  const p1 = {
    x: pivot.x + size * Math.sin(radians(end)),
    y: pivot.y - size * Math.cos(radians(end)),
  };

  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${size} ${size} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

function ToolShape({ shape }) {
  switch (shape) {
    case "driver":
      return <path className="skin glowable" d="M -5 -20 L -5 -208 L -12 -226 L -12 -250 L 12 -250 L 12 -226 L 5 -208 L 5 -20 Z" />;
    case "saw":
      return (
        <>
          <path className="skin glowable" d="M -6 -26 L -6 -248 L 4 -248 L 13 -44 L 4 -62 L 13 -80 L 4 -98 L 13 -116 L 4 -134 L 13 -152 L 4 -170 L 13 -188 L 4 -206 L 13 -224 L 4 -242 L 13 -260 L 4 -248 L -6 -26 Z" />
          <path className="glowable" d="M 4 -26 L 13 -44 L 4 -62 L 13 -80 L 4 -98 L 13 -116 L 4 -134 L 13 -152 L 4 -170 L 13 -188 L 4 -206 L 13 -224 L 4 -242 L 13 -260 L 4 -248" />
        </>
      );
    case "hook":
      return (
        <>
          <path className="skin glowable" d="M -3 -22 L -3 -190 C -3 -214 -23 -208 -21 -232 C -20 -246 -4 -248 3 -240" />
          <path className="glowable" d="M -14 -214 L -5 -208" />
          <path className="glowable" d="M 3 -240 L 3 -250" />
        </>
      );
    case "corkscrew":
      return (
        <>
          <path className="glowable" d="M 0 -26 L 0 -150" />
          <path className="glowable" d="M 0 -150 C 14 -158 -14 -166 0 -174 C 14 -182 -12 -190 0 -198 C 10 -206 -10 -214 0 -222 C 8 -230 -7 -237 0 -244" />
          <path className="glowable" d="M 0 -244 l 4 -7" />
        </>
      );
    case "scissors":
      return (
        <>
          <path className="glowable" d="M 0 -150 L -10 -246" />
          <path className="glowable" d="M 0 -150 L 10 -246" />
          <path className="glowable" d="M -3 -150 C -17 -128 -17 -92 -8 -78" />
          <path className="glowable" d="M 3 -150 C 17 -128 17 -92 8 -78" />
          <circle className="glowable" cx="-10" cy="-66" r="11" />
          <circle className="glowable" cx="10" cy="-66" r="11" />
          <circle className="glowable" cx="0" cy="-150" r="4.5" />
        </>
      );
    case "opener":
      return (
        <>
          <path className="skin glowable" d="M -3 -22 L -3 -186 C -20 -192 -22 -226 -3 -234 C 16 -240 22 -210 6 -200" />
          <path className="glowable" d="M -3 -234 L -3 -250" />
          <circle className="glowable" cx="-4" cy="-212" r="6" />
        </>
      );
    default:
      return (
        <>
          <path className="skin glowable" d="M -10 -20 L -10 -226 Q -10 -250 8 -249 Q 28 -245 18 -135 Q 13 -76 9 -20 Z" />
          <path className="glowable" d="M 0 -50 Q 10 -54 10 -74" />
        </>
      );
  }
}

export default function ToolWheel({ active, onSelect }) {
  return (
    <div className="knife-wrap">
      <svg className="knife" viewBox="0 0 640 576" role="img" aria-label="Interactive multi-tool of Kai Perez's skill sets">
        <path className="guide dash" d={arcPath(radius + 14, -spread - 6, spread + 6)} />
        <path className="guide" d={arcPath(radius - 92, -spread - 2, spread + 2)} opacity="0.5" />

        {capabilities.map((capability, index) => {
          const selected = index === active;
          const offset = selected ? -22 : 0;

          return (
            <g
              key={capability.key}
              className={`tool${selected ? " on" : ""}`}
              transform={`translate(${pivot.x},${pivot.y}) rotate(${angleFor(index)})`}
              onClick={() => onSelect(index)}
            >
              <g className="tool-grp" transform={`translate(0,${offset})`}>
                <ToolShape shape={capability.shape} />
              </g>
              <line x1="0" y1="-30" x2="0" y2={-radius} stroke="transparent" strokeWidth="44" style={{ fill: "none" }} />
            </g>
          );
        })}

        <g className="handle">
          <rect className="scale" x={pivot.x - 110} y={pivot.y - 16} width="220" height="94" rx="38" />
          <rect className="scale-sheen" x={pivot.x - 99} y={pivot.y - 7} width="198" height="76" rx="30" />
          <rect className="bolster" x={pivot.x - 104} y={pivot.y - 10} width="22" height="82" rx="11" />
          <rect className="bolster" x={pivot.x + 82} y={pivot.y - 10} width="22" height="82" rx="11" />
          <circle className="rivet sm" cx={pivot.x - 44} cy={pivot.y} r="3.4" />
          <circle className="rivet sm" cx={pivot.x + 44} cy={pivot.y} r="3.4" />
          <circle className="rivet" cx={pivot.x} cy={pivot.y} r="7" />
          <rect className="badge" x={pivot.x - 18} y={pivot.y + 24} width="36" height="40" rx="9" />
          <text className="badge-tx" x={pivot.x} y={pivot.y + 50}>KP</text>
        </g>
      </svg>
    </div>
  );
}
