"use client";

import { meetingUrl, packages } from "../lib/content";
import { trackEvent } from "../lib/analytics";

function packagePoints(offer) {
  return [
    ["Good for", offer.pathOutcome],
    ["You leave with", offer.board.outcome],
  ];
}

function polarPoint(radius, angle) {
  const radians = (angle - 90) * (Math.PI / 180);
  return `${(Math.cos(radians) * radius).toFixed(2)} ${(Math.sin(radians) * radius).toFixed(2)}`;
}

function cogPath(size, toothCount) {
  const rootRadius = size * 0.88;
  const outerRadius = size * 1.12;
  const step = 360 / toothCount;
  const points = [];

  for (let index = 0; index < toothCount; index += 1) {
    const base = index * step;
    points.push(
      polarPoint(rootRadius, base),
      polarPoint(outerRadius, base + step * 0.18),
      polarPoint(outerRadius, base + step * 0.42),
      polarPoint(rootRadius, base + step * 0.6),
      polarPoint(rootRadius, base + step * 0.82),
    );
  }

  return `M ${points.join(" L ")} Z`;
}

const gearWindows = Array.from({ length: 6 }, (_, index) => index * 60);

function Gear({ className = "", size = 54, label = "" }) {
  const toothCount = size < 30 ? 12 : 16;

  return (
    <g className={className}>
      <g className="gear-face">
        <path className="gear-body" d={cogPath(size, toothCount)} />
        <circle className="gear-inner" r={size * 0.68} />
        {gearWindows.map((rotation) => (
          <circle
            className="gear-window"
            cx={(Math.cos((rotation - 90) * (Math.PI / 180)) * size * 0.45).toFixed(2)}
            cy={(Math.sin((rotation - 90) * (Math.PI / 180)) * size * 0.45).toFixed(2)}
            r={Math.max(size * 0.085, 2.7)}
            key={rotation}
          />
        ))}
        <circle className="gear-core" r={size * 0.28} />
        <circle className="gear-dot" r={Math.max(size * 0.065, 3)} />
      </g>
      {label ? (
        <g className="gear-badge">
          <circle className="gear-badge-plate" r={size * 0.34} />
          <text className="gear-label" y="1">
            {label}
          </text>
        </g>
      ) : null}
    </g>
  );
}

function GearMachine() {
  return (
    <div className="package-machine" aria-label="Missing gear illustration">
      <svg
        className="package-machine-svg"
        viewBox="0 0 1180 260"
        preserveAspectRatio="xMidYMid slice"
        role="img"
      >
        <title>Kai as the missing gear that gets the machine moving</title>
        <rect className="machine-bed" x="28" y="34" width="1124" height="190" rx="38" />
        <path className="machine-flow" d="M 74 150 C 214 77 345 80 472 139 S 727 192 878 116 S 1062 80 1120 118" />
        <path className="machine-guide" d="M 70 178 C 228 96 372 101 520 160 S 802 203 1088 74" />
        <path className="machine-guide dash" d="M 92 205 C 260 130 410 132 568 178 S 820 203 1104 132" />

        <g className="machine-rail">
          <path d="M 78 188 H 390" />
          <path d="M 778 92 H 1106" />
          <path d="M 356 209 H 772" />
          <path d="M 482 62 H 698" />
          <circle cx="392" cy="188" r="6" />
          <circle cx="778" cy="92" r="6" />
        </g>

        <g className="machine-housing housing-left">
          <rect x="72" y="68" width="258" height="142" rx="32" />
          <circle cx="192" cy="139" r="76" />
          <path d="M 94 96 H 144" />
          <path d="M 94 181 H 142" />
        </g>

        <g className="machine-housing housing-mid">
          <rect x="404" y="50" width="372" height="164" rx="34" />
          <circle cx="590" cy="132" r="88" />
          <circle cx="590" cy="132" r="68" />
        </g>

        <g className="machine-housing housing-right">
          <rect x="846" y="58" width="262" height="144" rx="32" />
          <circle cx="974" cy="130" r="76" />
          <path d="M 1030 88 H 1082" />
          <path d="M 1038 174 H 1082" />
        </g>

        <g className="machine-couplers">
          <path d="M 254 140 C 316 122 363 124 418 144" />
          <path d="M 762 141 C 819 120 860 119 914 136" />
          <path d="M 526 206 H 654" />
        </g>

        <g className="machine-socket" transform="translate(590 132)">
          <circle r="76" />
          <path d="M -92 0 H -72" />
          <path d="M 72 0 H 92" />
          <path d="M 0 -92 V -72" />
          <path d="M 0 72 V 92" />
        </g>

        <g transform="translate(192 139)">
          <Gear className="machine-gear gear-left" size={44} />
        </g>
        <g transform="translate(326 164)">
          <Gear className="machine-gear gear-small" size={26} />
        </g>
        <g transform="translate(974 130)">
          <Gear className="machine-gear gear-right" size={44} />
        </g>
        <g transform="translate(1080 96)">
          <Gear className="machine-gear gear-tiny" size={22} />
        </g>
        <g transform="translate(846 176)">
          <Gear className="machine-gear gear-small" size={26} />
        </g>

        <g transform="translate(590 132)">
          <path className="missing-shadow" d="M -96 78 C -46 102 44 102 96 78" />
          <Gear className="machine-gear gear-main" size={56} label="KP" />
        </g>

        <g className="machine-bolts">
          <circle cx="78" cy="74" r="4" />
          <circle cx="1102" cy="74" r="4" />
          <circle cx="78" cy="184" r="4" />
          <circle cx="1102" cy="184" r="4" />
          <circle cx="434" cy="82" r="3" />
          <circle cx="744" cy="182" r="3" />
        </g>

        <g className="machine-signals">
          <circle cx="112" cy="110" r="5" />
          <circle cx="132" cy="110" r="5" />
          <circle cx="152" cy="110" r="5" />
          <path d="M 1018 66 h 46" />
          <path d="M 1018 194 h 46" />
        </g>
      </svg>
    </div>
  );
}

export default function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <div className="offer-heading">
        <div>
          <span className="sec-eyebrow mono">Ways to work together</span>
          <h2 className="sec-title">
            Start clear. Ship the thing. <span className="mut">Keep it working.</span>
          </h2>
        </div>
        <p className="offer-lede">
          Four practical ways to bring Kai in when the problem is worth fixing properly.
        </p>
      </div>

      <div className="investment-fit">
        <span className="mono">Investment fit</span>
        <p>
          Most client work starts around $5k. Full buildouts and operating support scale from there. Best fit for
          established businesses where the digital side is already affecting revenue, trust, or team time.
        </p>
      </div>

      <GearMachine />

      <div className="package-cards">
        {packages.map((offer, index) => (
          <article className={`package-card${offer.featured ? " featured" : ""}`} key={offer.name}>
            <div className="package-card-top">
              <span className="offer-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span className="package-range mono">{offer.range}</span>
            </div>
            <span className="package-eyebrow mono">{offer.eyebrow}</span>
            <h3>{offer.name}</h3>
            <p className="offer-summary">{offer.summary}</p>
            {offer.rangeNote ? <p className="package-range-note">{offer.rangeNote}</p> : null}

            <div className="package-point-list">
              {packagePoints(offer).map(([label, text]) => (
                <div className="package-point" key={label}>
                  <span className="mono">{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <a
              className="package-link"
              href={meetingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("package_cta_click", {
                  package_name: offer.name,
                  package_range: offer.range,
                })
              }
            >
              {offer.cta}
            </a>
            <p className="package-qualifier">For businesses ready to invest in the fix, not just talk through it.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
