"use client";

import { Fragment, useState, useEffect, useRef, useCallback } from "react";

/* ---------- geometry helpers (pivot at 0,0; tool points up = -y) ---------- */
  // saw outline: straight left spine, sawtooth right edge
  function sawInner(){
    const top=-248, bot=-26, spineX=-6, baseX=4, toothX=13;
    let teeth=`M ${baseX} ${bot}`;
    let y=bot, up=true;
    const seg=18;
    for(let i=0;i<13;i++){
      y-=seg;
      teeth+=` L ${up?toothX:baseX} ${y}`;
      up=!up;
    }
    teeth+=` L ${baseX} ${top}`;
    return `
      <path class="skin glowable" d="M ${spineX} ${bot} L ${spineX} ${top} L ${baseX} ${top} ${teeth.replace(`M ${baseX} ${bot}`,'')} L ${spineX} ${bot} Z"/>
      <path class="glowable" d="${teeth}"/>
    `;
  }
  // corkscrew: shaft then a tapering spiral drawn as a wavy path
  function corkInner(){
    const shaftTop=-150;
    let d=`M 0 ${shaftTop}`;
    const turns=4, amp0=11, top=-244;
    const span=top-shaftTop; // negative
    const steps=turns*2;
    for(let i=1;i<=steps;i++){
      const t=i/steps;
      const y=shaftTop+span*t;
      const amp=amp0*(1-t*0.55);
      const dir=(i%2===1)?1:-1;
      const cy=shaftTop+span*((i-0.5)/steps);
      d+=` Q ${dir*amp} ${cy} 0 ${y}`;
    }
    return `
      <path class="glowable" d="M 0 -26 L 0 ${shaftTop}"/>
      <path class="glowable" d="${d}"/>
      <path class="glowable" d="M 0 ${top} l 4 -7"/>
    `;
  }

  const TOOLS = [
    {
      key:"product", name:"Product Building", short:"Product", cat:"Product Building",
      tagline:"Zero to shipped.",
      desc:"The sharp edge. Kai takes a scattered idea, cuts it down to the version actually worth building, and ships it — scoping, prototyping, and getting a real product into customers' hands fast.",
      proof:"Idea → live product in weeks, not quarters.",
      inner:`
        <path class="skin glowable" d="M -10 -20 L -10 -226 Q -10 -250 8 -249 Q 28 -245 18 -135 Q 13 -76 9 -20 Z"/>
        <path class="glowable" d="M 0 -50 Q 10 -54 10 -74"/>
      `
    },
    {
      key:"fullstack", name:"Full-Stack Dev", short:"Full-Stack", cat:"Full-Stack Engineering",
      tagline:"Builds the whole machine.",
      desc:"Front to back, Kai assembles the actual thing — clean React frontends, solid APIs, databases that won't bite you later. The rare operator who can both design the screw and turn it.",
      proof:"One person, the entire stack.",
      inner:`
        <path class="skin glowable" d="M -5 -20 L -5 -208 L -12 -226 L -12 -250 L 12 -250 L 12 -226 L 5 -208 L 5 -20 Z"/>
      `
    },
    {
      key:"aws", name:"AWS & DevOps", short:"DevOps", cat:"Cloud & Infrastructure",
      tagline:"Infrastructure that holds.",
      desc:"The heavy tool. Cloud architecture, CI/CD, autoscaling, and the unglamorous reliability work — so the system stays up when the traffic finally shows up. AWS-native and cost-aware.",
      proof:"Pipelines, scaling, and uptime — handled.",
      inner: sawInner()
    },
    {
      key:"shopify", name:"Shopify & Ecommerce", short:"Ecommerce", cat:"Commerce Engineering",
      tagline:"Opens up revenue.",
      desc:"Kai knows commerce from the inside — themes, apps, checkout, and the messy backend that quietly leaks money. He cleans it up and turns a store into a system that actually sells.",
      proof:"Stores that convert, plumbing that works.",
      inner:`
        <path class="skin glowable" d="M -3 -22 L -3 -190 C -3 -214 -23 -208 -21 -232 C -20 -246 -4 -248 3 -240"/>
        <path class="glowable" d="M -14 -214 L -5 -208"/>
        <path class="glowable" d="M 3 -240 L 3 -250"/>
      `
    },
    {
      key:"ai", name:"AI Workflows", short:"AI", cat:"AI & Automation",
      tagline:"Automates the busywork.",
      desc:"The clever twist. Kai wires LLMs and automation into the day-to-day — agents, pipelines, and internal tools that lift the repetitive load off the team and hand back real hours.",
      proof:"Manual ops → automated leverage.",
      inner: corkInner()
    },
    {
      key:"growth", name:"Growth Systems", short:"Growth", cat:"Growth & Revenue",
      tagline:"Cuts the path to revenue.",
      desc:"Funnels, analytics, lifecycle, and the experiments that genuinely move numbers. Kai builds the growth engine and reads the data honestly enough to keep steering it.",
      proof:"Systems that compound, not one-off hacks.",
      inner:`
        <path class="glowable" d="M 0 -150 L -10 -246"/>
        <path class="glowable" d="M 0 -150 L 10 -246"/>
        <path class="glowable" d="M -3 -150 C -17 -128 -17 -92 -8 -78"/>
        <path class="glowable" d="M 3 -150 C 17 -128 17 -92 8 -78"/>
        <circle class="glowable" cx="-10" cy="-66" r="11"/>
        <circle class="glowable" cx="10" cy="-66" r="11"/>
        <circle class="glowable" cx="0" cy="-150" r="4.5"/>
      `
    },
    {
      key:"brand", name:"Brand & Positioning", short:"Brand", cat:"Brand & Strategy",
      tagline:"Sharpens the story.",
      desc:"Founder-level judgment on what you're really selling and why it matters. Tighter positioning, sharper messaging, and a brand that finally sounds like the product is as good as it is.",
      proof:"Fuzzy pitch → words that land.",
      inner:`
        <path class="skin glowable" d="M -3 -22 L -3 -186 C -20 -192 -22 -226 -3 -234 C 16 -240 22 -210 6 -200"/>
        <path class="glowable" d="M -3 -234 L -3 -250"/>
        <circle class="glowable" cx="-4" cy="-212" r="6"/>
      `
    }
  ];

  const PIVOT={x:320,y:470};

  const CLIENTS=[
    {n:"Lumen & Vale", g:'<circle cx="11" cy="11" r="8"/><path d="M11 3v16"/>'},
    {n:"Halberd", g:'<path d="M11 3 19 19 3 19Z"/>'},
    {n:"Tesserae", g:'<rect x="4" y="4" width="14" height="14" rx="2"/><path d="M11 4v14M4 11h14"/>'},
    {n:"Northwind", g:'<path d="M3 15Q11 2 19 15"/><circle cx="11" cy="15" r="1.6"/>'},
    {n:"Cardinal", g:'<path d="M11 3v16M5 9h12"/>'},
    {n:"Aperture", g:'<circle cx="11" cy="11" r="8"/><path d="M11 3 15 11 11 19"/>'}
  ];

  const CASES=[
    {
      tag:"Ecommerce · Growth",
      name:"Lumen & Vale",
      sector:"DTC home fragrance · Shopify Plus",
      problem:"A brand with 9-figure ambition stuck on a bloated theme — 14 apps, a 4-second checkout, and conversion quietly bleeding out on mobile.",
      built:[
        "Rebuilt the storefront headless on Hydrogen",
        "Cut 14 apps to 4, killed ~600kb of script",
        "Custom checkout + server-side tracking",
        "Lifecycle flows that actually segment"
      ],
      big:"+34%",
      lbl:"checkout conversion",
      sub:"$1.2M incremental revenue in two quarters · LCP 4.1s → 1.2s"
    },
    {
      tag:"AI Workflows · Full-Stack",
      name:"Halberd",
      sector:"Insurance operations platform",
      problem:"An ops team of 30 drowning in manual document triage — every claim read by hand, SLAs slipping week over week.",
      built:[
        "LLM pipeline for classification + extraction",
        "RAG over 80k internal documents",
        "React ops console wired into their core system",
        "Human-in-the-loop review queue"
      ],
      big:"22 hrs",
      lbl:"saved / rep / week",
      sub:"First-response time 9h → 38min · 71% auto-triaged"
    },
    {
      tag:"Product · AWS / DevOps",
      name:"Tesserae",
      sector:"Seed-stage marketplace · 0→1",
      problem:"A founder with a deck and no product. Needed a real MVP, real infrastructure, and a demo that could survive a launch spike.",
      built:[
        "Full product, React + Node, in 7 weeks",
        "AWS from scratch — ECS, RDS, CloudFront, IaC",
        "CI/CD + observability for a solo founder",
        "Scaled it through a Product Hunt #1"
      ],
      big:"12k",
      lbl:"users in month one",
      sub:"99.98% uptime through launch · raised seed off the build"
    }
  ];

  const VOICES=[
    {
      q:"We brought Kai in to “just fix the store.” He rebuilt how we think about the entire funnel — and the revenue showed up inside the quarter. He operates like a founder, not a contractor.",
      nm:"Daniela Reyes", rl:"Founder & CEO, Lumen & Vale", init:"DR"
    },
    {
      q:"Kai dropped into a messy codebase and a skeptical team and earned both fast. Three weeks later half our manual work was gone. I'd hand him anything technical without a second thought.",
      nm:"Marcus Vo", rl:"VP Operations, Halberd", init:"MV"
    }
  ];

  const RADIUS=240;
  const SPREAD=62;          // degrees each side
  const N=TOOLS.length;
  const STEP=(SPREAD*2)/(N-1);
  const angleOf=(i)=>-SPREAD+i*STEP;
  const rad=(d)=>d*Math.PI/180;

  function arcPath(r,a0,a1){
    const p0={x:PIVOT.x+r*Math.sin(rad(a0)),y:PIVOT.y-r*Math.cos(rad(a0))};
    const p1={x:PIVOT.x+r*Math.sin(rad(a1)),y:PIVOT.y-r*Math.cos(rad(a1))};
    return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const INTERVAL=4200;

  function Knife({active,setActive,paused}){
    return (
      <div className="knife-wrap">
        <svg className="knife" viewBox="0 0 640 576" role="img" aria-label="Interactive multi-tool of Kai Perez's skill sets">
          {/* guide arcs */}
          <path className="guide dash" d={arcPath(RADIUS+14,-SPREAD-6,SPREAD+6)}/>
          <path className="guide" d={arcPath(RADIUS-92,-SPREAD-2,SPREAD+2)} opacity="0.5"/>
          {/* tools */}
          {TOOLS.map((t,i)=>{
            const on=i===active;
            const a=angleOf(i);
            const ext=on?22:0;
            return (
              <g key={t.key} className={"tool"+(on?" on":"")}
                 onClick={()=>setActive(i)}
                 onMouseEnter={()=>{}}
                 transform={`translate(${PIVOT.x},${PIVOT.y}) rotate(${a})`}
                 style={{cursor:"pointer"}}>
                <g className="tool-grp" transform={`translate(0,${-ext})`}
                   dangerouslySetInnerHTML={{__html:t.inner}} />
                {/* invisible wide hit area */}
                <line x1="0" y1="-30" x2="0" y2={-RADIUS} stroke="transparent" strokeWidth="44" style={{fill:"none"}}/>
              </g>
            );
          })}
          {/* swiss army knife handle / scale */}
          <g className="handle">
            <rect className="scale" x={PIVOT.x-110} y={PIVOT.y-16} width="220" height="94" rx="38"/>
            <rect className="scale-sheen" x={PIVOT.x-99} y={PIVOT.y-7} width="198" height="76" rx="30"/>
            <rect className="bolster" x={PIVOT.x-104} y={PIVOT.y-10} width="22" height="82" rx="11"/>
            <rect className="bolster" x={PIVOT.x+82} y={PIVOT.y-10} width="22" height="82" rx="11"/>
            <circle className="rivet sm" cx={PIVOT.x-44} cy={PIVOT.y} r="3.4"/>
            <circle className="rivet sm" cx={PIVOT.x+44} cy={PIVOT.y} r="3.4"/>
            <circle className="rivet" cx={PIVOT.x} cy={PIVOT.y} r="7"/>
            <rect className="badge" x={PIVOT.x-18} y={PIVOT.y+24} width="36" height="40" rx="9"/>
            <text className="badge-tx" x={PIVOT.x} y={PIVOT.y+50}>KP</text>
          </g>
        </svg>
      </div>
    );
  }

  function EmailButton({label}){
    const [c,setC]=useState(false);
    const copy=()=>{
      if(navigator.clipboard){navigator.clipboard.writeText("kaiperez@gmail.com").catch(()=>{});}
      setC(true);setTimeout(()=>setC(false),1600);
    };
    return (
      <button className="btn ghost" onClick={copy}>
        {c ? <span className="copied mono">Copied ✓</span> : <span className="mono">{label||"kaiperez@gmail.com"}</span>}
      </button>
    );
  }

  function ProofStrip(){
    return (
      <div className="proofwrap">
        <div className="proof-strip">
          <span className="proof-label mono">Selected partners</span>
          <div className="logos">
            {CLIENTS.map(c=>(
              <span className="logo" key={c.n}>
                <svg width="22" height="22" viewBox="0 0 22 22" dangerouslySetInnerHTML={{__html:c.g}}/>
                {c.n}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function Work(){
    return (
      <section className="section" id="work">
        <div className="sec-head">
          <span className="sec-eyebrow mono">01 — Selected work</span>
          <h2 className="sec-title">Proof, <span className="mut">not adjectives.</span></h2>
        </div>
        <div className="work-grid">
          {CASES.map(c=>(
            <article className="case" key={c.name}>
              <div className="tag mono">{c.tag}</div>
              <h3>{c.name}</h3>
              <div className="sector">{c.sector}</div>
              <p className="problem">{c.problem}</p>
              <ul className="built">
                {c.built.map((b,i)=><li key={i}>{b}</li>)}
              </ul>
              <div className="metric">
                <span className="big">{c.big}</span>
                <span className="lbl mono">{c.lbl}</span>
              </div>
              <p className="sub mono">{c.sub}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function Voices(){
    return (
      <section className="section">
        <div className="sec-head">
          <span className="sec-eyebrow mono">02 — In their words</span>
          <h2 className="sec-title">People who'd <span className="mut">hire him again.</span></h2>
        </div>
        <div className="voices">
          {VOICES.map(v=>(
            <figure className="quote" key={v.nm}>
              <div className="mark">“</div>
              <p>{v.q}</p>
              <figcaption className="by">
                <span className="avatar mono">{v.init}</span>
                <span>
                  <span className="nm" style={{display:"block"}}>{v.nm}</span>
                  <span className="rl">{v.rl}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  function Closing(){
    return (
      <section className="section closing">
        <h2>Got something messy, ambitious, or <em>overdue?</em></h2>
        <p>One operator, the whole toolkit. Tell Kai what you're trying to build — he'll help you figure out what it actually takes, then go build it.</p>
        <div className="ctas">
          <a className="btn primary" href="mailto:kaiperez@gmail.com?subject=Let's%20build%20something">Start a conversation <span className="arr">↗</span></a>
          <EmailButton/>
        </div>
        <div className="closing-status mono"><span className="dot"></span>Available for work · Remote</div>
      </section>
    );
  }

  function App(){
    const [active,setActive]=useState(0);
    const [paused,setPaused]=useState(false);
    const [copied,setCopied]=useState(false);
    const [tick,setTick]=useState(0); // forces chip-fill restart
    const timer=useRef(null);
    const reduce=useRef(false);

    useEffect(()=>{
      reduce.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },[]);

    const advance=useCallback((next)=>{
      setActive(prev=>{
        const v=(typeof next==="number")?next:(prev+1)%N;
        return v;
      });
      setTick(t=>t+1);
    },[]);

    useEffect(()=>{
      if(paused) return;
      timer.current=setInterval(()=>advance(),INTERVAL);
      return ()=>clearInterval(timer.current);
    },[paused,advance,tick===-999]);

    // restart interval whenever user manually changes active
    const pick=useCallback((i)=>{
      setActive(i);setTick(t=>t+1);
      clearInterval(timer.current);
      if(!paused){
        timer.current=setInterval(()=>advance(),INTERVAL);
      }
    },[paused,advance]);

    const t=TOOLS[active];
    const num=String(active+1).padStart(2,"0");

    const copyEmail=()=>{
      const email="kaiperez@gmail.com";
      if(navigator.clipboard){navigator.clipboard.writeText(email).catch(()=>{});}
      setCopied(true);setTimeout(()=>setCopied(false),1600);
    };

    return (
      <Fragment>
        <header className="topbar">
          <div className="brand">
            <div className="monogram">KP</div>
            <div className="who">
              <b>Kai Perez</b>
              <span className="mono">Technical Operator</span>
            </div>
          </div>
          <div className="status mono">
            <span className="dot"></span>Available for work
          </div>
        </header>

        <main className="hero"
              onMouseEnter={()=>setPaused(true)}
              onMouseLeave={()=>setPaused(false)}>
          <section className="left">
            <div className="eyebrow mono"><span className="tick"></span>Builder · Fixer · Strategist</div>
            <h1>One person.<br/>The whole <em>toolkit.</em></h1>
            <p className="lede">Kai Perez is the Swiss Army knife companies reach for when they need someone to diagnose the real problem, build the system, and move the business toward revenue — no bloated team required.</p>

            <div className="panel" key={active}>
              <div className="swap">
                <div className="panel-head">
                  <span className="idx mono">{num} / 0{N}</span>
                  <span className="cat mono">{t.cat}</span>
                </div>
                <h2 className="tagline">{t.tagline}</h2>
                <p className="desc">{t.desc}</p>
                <div className="proofrow">
                  <div className="proof"><span className="pip"></span>{t.proof}</div>
                  <a className="casestudy" href="#work">View case study →</a>
                </div>
              </div>
            </div>

            <div className="ctas">
              <a className="btn primary" href="#work">See his work <span className="arr">↓</span></a>
              <EmailButton/>
            </div>
          </section>

          <section className="stage">
            <Knife active={active} setActive={pick} paused={paused}/>
            <div className="chips">
              {TOOLS.map((tt,i)=>(
                <button key={tt.key}
                        className={"chip"+(i===active?" on":"")+(i===active&&!paused?" timing":"")}
                        style={{"--dur":INTERVAL+"ms"}}
                        onClick={()=>pick(i)}>
                  <span className="num mono">{String(i+1).padStart(2,"0")}</span>
                  {tt.short}
                  <span className="fill" key={tick+"-"+i}></span>
                </button>
              ))}
            </div>
          </section>
          <a className="scrollcue mono" href="#work">Scroll for proof<span className="ar">↓</span></a>
        </main>

        <ProofStrip/>
        <Work/>
        <Voices/>
        <Closing/>
      </Fragment>
    );
  }

export default App;
