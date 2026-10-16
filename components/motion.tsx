"use client"

import { useEffect } from "react"

/**
 * Page-wide motion, driven by data attributes so the markup stays plain:
 *   data-rv     reveal on scroll (adds data-in)
 *   data-par    parallax, value = strength
 *   data-prog   scroll progress through the element -> --p (0..1)
 *   data-tilt   pointer tilt + spotlight on cards
 *   data-spot   spotlight only
 *   data-mag    magnetic button
 *   data-count  number counts up when revealed
 *   data-step   marks the active step of a sequence while it is mid screen
 * Nothing runs with reduced motion, and without JavaScript the page is simply
 * fully visible (the head script only adds .js when it runs).
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    // End of the opening: unlock scrolling.
    let doneTimer = 0
    let waitObserver: MutationObserver | null = null
    if (root.classList.contains("op-run")) {
      // The opening is paused (.op-wait) until the page is ready; its clock starts when that class goes.
      const start = () => {
        doneTimer = window.setTimeout(() => root.classList.add("op-done"), 2200)
      }
      if (root.classList.contains("op-wait")) {
        waitObserver = new MutationObserver(() => {
          if (!root.classList.contains("op-wait")) {
            waitObserver?.disconnect()
            start()
          }
        })
        waitObserver.observe(root, { attributes: true, attributeFilter: ["class"] })
      } else {
        start()
      }
    } else {
      root.classList.add("op-done")
    }

    const cleanups: Array<() => void> = []

    // ---- reveal on scroll -------------------------------------------------
    const rv = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"))
    const counters = new WeakSet<HTMLElement>()
    const runCounters = (scope: HTMLElement) => {
      scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (counters.has(el)) return
        counters.add(el)
        const target = parseFloat(el.dataset.count ?? "0")
        const pad = parseInt(el.dataset.pad ?? "0", 10)
        const suffix = el.dataset.suffix ?? ""
        const dur = 1400
        const t0 = performance.now()
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / dur)
          const e = 1 - Math.pow(1 - k, 3)
          el.textContent = String(Math.round(target * e)).padStart(pad, "0") + suffix
          if (k < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
    }
    if (reduced || !("IntersectionObserver" in window)) {
      rv.forEach((el) => el.setAttribute("data-in", "1"))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            const el = e.target as HTMLElement
            el.setAttribute("data-in", "1")
            runCounters(el)
            io.unobserve(el)
          })
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
      )
      rv.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    // ---- active step in a sequence -----------------------------------------
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-step]"))
    if (steps.length && "IntersectionObserver" in window) {
      const so = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const el = e.target as HTMLElement
            if (e.isIntersecting) el.setAttribute("data-active", "1")
            else if (e.boundingClientRect.top > 0) el.removeAttribute("data-active")
          })
        },
        { rootMargin: "-38% 0px -38% 0px" },
      )
      steps.forEach((s) => so.observe(s))
      cleanups.push(() => so.disconnect())
    }

    // ---- scroll-linked: progress bar, parallax, per-element progress ---------
    const bar = document.getElementById("scrollbar")
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-par]"))
    const prog = Array.from(document.querySelectorAll<HTMLElement>("[data-prog]"))
    let ticking = false
    const update = () => {
      ticking = false
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      if (reduced) return
      for (const el of par) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const k = parseFloat(el.dataset.par ?? "0.1")
        const mid = r.top + r.height / 2 - vh / 2
        el.style.setProperty("--py", `${(-mid * k).toFixed(1)}px`)
      }
      for (const el of prog) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        // "enter": 0 when the element starts to appear, 1 once it is well into view.
        // "through": 0 at the first third of the screen, 1 when its end reaches it.
        const raw = el.dataset.prog === "through" ? (vh * 0.7 - r.top) / Math.max(1, r.height) : (vh * 0.95 - r.top) / (vh * 0.6)
        el.style.setProperty("--p", Math.min(1, Math.max(0, raw)).toFixed(3))
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    })

    // ---- pointer: tilt, spotlight, magnetic ------------------------------------
    if (!reduced && fine) {
      const onMove = (e: PointerEvent) => {
        const t = e.target as Element | null
        if (!t || !t.closest) return
        const card = t.closest<HTMLElement>("[data-tilt],[data-spot]")
        if (card) {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`)
          card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`)
          if (card.hasAttribute("data-tilt")) {
            card.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`)
            card.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`)
          }
        }
        const mag = t.closest<HTMLElement>("[data-mag]")
        if (mag) {
          const r = mag.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          mag.style.setProperty("--tx", `${(dx * 0.18).toFixed(1)}px`)
          mag.style.setProperty("--ty", `${(dy * 0.28).toFixed(1)}px`)
        }
      }
      const onOut = (e: PointerEvent) => {
        const t = e.target as Element | null
        if (!t || !t.closest) return
        const card = t.closest<HTMLElement>("[data-tilt]")
        if (card && !card.contains(e.relatedTarget as Node | null)) {
          card.style.setProperty("--rx", "0deg")
          card.style.setProperty("--ry", "0deg")
        }
        const mag = t.closest<HTMLElement>("[data-mag]")
        if (mag && !mag.contains(e.relatedTarget as Node | null)) {
          mag.style.setProperty("--tx", "0px")
          mag.style.setProperty("--ty", "0px")
        }
      }
      document.addEventListener("pointermove", onMove, { passive: true })
      document.addEventListener("pointerout", onOut, { passive: true })
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove)
        document.removeEventListener("pointerout", onOut)
      })
    }

    return () => {
      window.clearTimeout(doneTimer)
      waitObserver?.disconnect()
      cleanups.forEach((f) => f())
    }
  }, [])

  return <div id="scrollbar" className="scrollbar" aria-hidden="true" />
}
