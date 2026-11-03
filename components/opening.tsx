"use client"

import { useEffect } from "react"

const WORD = "SentrIA"

function Letters() {
  const G: { vb: string; d: string; rot: number; dy: number; sc: number; ml: number; z: number; ia?: boolean }[] = [
    { vb: "0 -800 647 1000", d: "M35 -80C103 -16 215 23 320 23C472 23 616 -57 612 -215C609 -331 524 -386 413 -428C292 -474 184 -502 183 -592C182 -643 236 -677 307 -677C389 -678 441 -647 469 -599C490 -563 498 -518 497 -470L517 -466L563 -671C495 -714 408 -736 322 -737C191 -738 68 -680 68 -543C68 -414 176 -369 285 -327C401 -282 485 -248 486 -156C487 -77 421 -39 345 -39C257 -39 175 -84 144 -164C125 -206 119 -256 128 -310L110 -316Z", rot: -18, dy: 0.08, sc: 1.22, ml: 0, z: 2 },
    { vb: "0 -800 520 1000", d: "M271 12C373 12 464 -48 500 -152L489 -158C464 -108 406 -80 344 -80C246 -80 164 -154 159 -291H462L471 -317C476 -426 393 -506 283 -506C132 -506 30 -395 30 -244C30 -84 140 12 271 12ZM160 -332C167 -406 203 -463 259 -463C307 -463 349 -407 347 -332Z", rot: 16, dy: -0.14, sc: 0.78, ml: -0.08, z: 1 },
    { vb: "0 -800 567 1000", d: "M287 73 296 81C437 -12 537 -174 537 -310C537 -432 457 -508 353 -508C303 -508 252 -491 208 -462C208 -476 206 -489 203 -500H10V-483H28C63 -483 80 -461 80 -413V-94C80 -49 76 -27 64 0H223C213 -24 209 -48 209 -89V-409C231 -432 261 -446 290 -446C361 -446 402 -371 402 -256C402 -134 357 -3 287 73Z", rot: -6, dy: 0.04, sc: 1.0, ml: -0.05, z: 2 },
    { vb: "0 -800 315 1000", d: "M52 0H210C201 -22 197 -43 197 -80V-458H276L295 -517L281 -521C271 -503 258 -500 222 -500H197V-584C197 -635 202 -671 218 -715L209 -721L44 -570V-562C57 -544 63 -525 66 -495L20 -470L23 -458H67V-84C67 -44 63 -24 52 0Z", rot: 22, dy: -0.12, sc: 0.82, ml: -0.04, z: 1 },
    { vb: "0 -800 460 1000", d: "M64 0H222C212 -24 208 -48 208 -89V-376C226 -385 246 -389 265 -389C301 -389 336 -374 364 -348C409 -383 440 -445 440 -502L428 -503C420 -482 400 -471 379 -471C355 -471 330 -485 320 -510L206 -423C206 -455 206 -481 200 -500H10V-483H28C63 -483 80 -461 80 -413V-94C80 -49 76 -27 64 0Z", rot: -13, dy: 0.10, sc: 0.92, ml: -0.02, z: 2 },
    { vb: "0 -800 289 1000", d: "M75 0H239C230 -22 226 -43 226 -80V-722H20V-706H38C73 -706 90 -686 90 -642V-84C90 -44 86 -24 75 0Z", rot: 8, dy: -0.10, sc: 1.14, ml: 0.03, z: 4, ia: true },
    { vb: "0 -800 748 1000", d: "M537 0H728L422 -673C415 -688 407 -706 404 -722H117V-706H154C228 -706 253 -684 271 -644L327 -521C66 -424 56 -130 40 30L52 38C196 -106 312 -237 394 -371L526 -80C539 -53 547 -22 537 0ZM187 -154C170 -301 238 -423 346 -489L368 -441C326 -339 268 -244 187 -154Z", rot: -20, dy: 0.10, sc: 1.22, ml: -0.05, z: 2, ia: true },
  ]
  return (
    <div className="op-word">
      {G.map((g, i) => (
        <i key={i} className={g.ia ? "op-ia" : undefined} style={{
          "--rot": `${g.rot}deg`, "--dy": `${g.dy}em`, "--sc": `${g.sc}`,
          "--ml": `${g.ml}em`, "--z": `${g.z}`, "--d": `${i}`,
        } as React.CSSProperties}>
          <svg viewBox={g.vb} aria-hidden="true" className="op-g">
            <path d={g.d} fill="currentColor" />
          </svg>
        </i>
      ))}
    </div>
  )
}

/** The mark in two pieces, so the lime dome and the white bowl can settle into place on their own. */
function MarkPieces() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="op-mark">
      <g className="op-m-top">
        <path d="M14 42.5a23 23 0 0 1 46 0z" fill="var(--lime)" stroke="var(--lime)" strokeWidth="10" strokeLinejoin="round" />
        <rect x="9" y="40" width="10" height="17.5" rx="5" fill="var(--lime)" />
      </g>
      <g className="op-m-bot">
        <path d="M40 57.5a23 23 0 0 0 46 0z" fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        <rect x="81" y="42.5" width="10" height="17.5" rx="5" fill="#fff" />
      </g>
    </svg>
  )
}

/**
 * The opening, about 3.5 s, in Unbounded: the two halves of the mark settle
 * (0.15 s), the mark glides left while the name is revealed in one sweep with "IA"
 * in lime (1 s), they hold, then the black panel lifts away with the name trailing
 * behind it and the page is underneath (2.55 s). No line, no caption, no glow. Pure CSS, so it ends itself (visibility: hidden) even if no script runs.
 * Only shown when <html> has .op-run (set before paint by the head script).
 * The timings are shared with the hero entrance (--t0) and the scroll unlock (a little before the end, so the unlock never loses a race with the end of the opening)
 * (components/motion.tsx): change them together.
 */
export function Opening() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("op-wait")) return
    // Play as soon as the fonts are ready and two frames are painted (never wait for images).
    // The head script lifts the pause after 0.9 s whatever happens.
    let cancelled = false
    Promise.resolve(document.fonts ? document.fonts.ready : undefined).then(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!cancelled) root.classList.remove("op-wait")
        })
      )
    })
    return () => {
      cancelled = true
    }
  }, [])
  return (
    <div className="op" aria-hidden="true">
      <div className="op-bg">
        <div className="op-lock">
          <MarkPieces />
          <Letters />
        </div>
      </div>
    </div>
  )
}
