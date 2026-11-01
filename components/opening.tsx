"use client"

import { useEffect } from "react"

const WORD = "SentrIA"

function Letters() {
  return (
    <div className="op-word">
        <i key={0}>
          <svg viewBox="0 -800 762 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M131 145C166 115 207 90 255 72C302 53 351 44 401 45C434 45 458 50 474 60C489 69 497 83 497 102C497 124 488 141 471 155C453 168 423 180 382 192C346 202 310 213 273 225C235 236 201 251 171 271C140 290 115 315 96 345C76 375 66 413 66 461C66 503 74 539 91 570C107 600 129 625 158 645C186 664 219 678 257 688C294 697 334 702 376 702C405 702 433 700 460 696C486 692 512 686 538 678C563 669 588 658 614 646C638 633 664 618 691 600L609 440C577 464 541 484 503 498C464 512 423 519 381 521C367 521 354 521 342 520C329 518 318 515 309 511C299 506 292 500 287 494C281 487 278 479 278 469C278 459 279 450 283 443C285 435 291 427 300 421C308 414 321 407 338 401C354 394 375 387 403 380C445 368 486 355 524 343C561 329 594 313 622 294C650 274 672 249 688 220C704 190 712 153 712 109C712 67 704 31 688 1C672 -29 649 -55 621 -75C592 -95 558 -110 519 -120C479 -130 436 -135 390 -135C323 -135 261 -125 204 -105C146 -85 92 -57 43 -22Z" fill="currentColor" />
          </svg>
        </i>
        <i key={1}>
          <svg viewBox="0 -800 792 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M270 74C300 36 343 17 401 17C441 17 475 23 504 36C532 48 559 67 585 95L720 -5C682 -49 638 -83 590 -108C540 -132 483 -145 417 -145C363 -145 313 -137 269 -123C224 -107 185 -86 153 -58C120 -30 95 4 77 45C59 85 50 130 50 181C50 230 59 275 78 316C96 356 121 390 153 419C185 447 222 469 265 485C307 500 353 508 402 508C452 508 498 500 540 486C582 470 618 449 648 421C678 393 701 358 719 318C735 277 744 231 744 180ZM409 348C363 348 326 337 297 315C267 293 249 262 241 223L533 288C519 305 502 319 482 331C461 342 437 348 409 348Z" fill="currentColor" />
          </svg>
        </i>
        <i key={2}>
          <svg viewBox="0 -800 783 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M264 436C276 445 289 454 303 462C317 469 331 475 347 481C361 486 376 490 392 494C406 496 420 498 434 498C474 498 511 492 545 481C579 469 608 452 634 431C658 409 678 384 692 355C706 325 713 293 713 258V-115H505V194C505 218 502 239 496 257C490 273 482 287 472 298C462 308 450 315 438 320C424 324 411 326 398 326C368 326 342 317 321 299C299 280 284 256 278 226V-115H70V478H248Z" fill="currentColor" />
          </svg>
        </i>
        <i key={3}>
          <svg viewBox="0 -800 502 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M336 478H472V306H336V110C336 94 340 81 350 72C359 62 372 57 389 57H482V-115H312C286 -115 263 -111 241 -103C219 -94 199 -82 183 -67C165 -51 152 -33 143 -12C133 10 128 34 128 62V306H20V478H128V682H336Z" fill="currentColor" />
          </svg>
        </i>
        <i key={4}>
          <svg viewBox="0 -800 550 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M261 426C276 443 295 456 319 465C342 473 366 478 392 478H522L486 306H366C354 306 342 303 332 298C321 292 312 285 304 276C296 266 289 255 285 243C280 230 278 216 278 202V-115H70V478H248Z" fill="currentColor" />
          </svg>
        </i>
        <i key={5} className="op-ia">
          <svg viewBox="0 -800 348 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M278 682V-115H70V682Z" fill="currentColor" />
          </svg>
        </i>
        <i key={6} className="op-ia">
          <svg viewBox="0 -800 842 1000" aria-hidden="true" className="op-g">
            <path transform="scale(1 -1)" d="M20 -115 290 682H552L822 -115H614L538 108L280 37L228 -115ZM344 226 484 265 421 452Z" fill="currentColor" />
          </svg>
        </i>
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
