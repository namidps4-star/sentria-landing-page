/**
 * The copy of the hero that the lens magnifies: the photo that is showing, the dark layer, the headline,
 * the proof lines and the caption, without the lens itself. It is a div (the page keeps one heading
 * level 1), has no ids, cannot be focused or read out, and its animations are switched off in CSS.
 */
export function buildLensCopy(stage: HTMLElement): HTMLElement {
  const copy = document.createElement("div") // a div, not another stage: ids are stripped and the page keeps one heading level 1
  copy.className = "hero-stage lens-copy"
  copy.setAttribute("aria-hidden", "true")
  copy.setAttribute("inert", "")
  Array.from(stage.children).forEach((child) => {
    const el = child as HTMLElement
    if (el.classList.contains("lens")) return
    if (el.classList.contains("hero-film")) {
      const film = el.cloneNode(false) as HTMLElement
      const slide = el.querySelector(".hf-slide[data-active=\"1\"]")
      const scrim = el.querySelector(".hf-scrim")
      if (slide) film.appendChild(slide.cloneNode(true))
      if (scrim) film.appendChild(scrim.cloneNode(true))
      copy.appendChild(film)
      return
    }
    copy.appendChild(el.cloneNode(true))
  })
  copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"))
  // the page keeps one heading level 1: the copy's headline becomes a plain div with the same classes
  copy.querySelectorAll("h1").forEach((h) => {
    const div = document.createElement("div")
    div.className = h.className
    div.innerHTML = h.innerHTML
    h.replaceWith(div)
  })
  copy.querySelectorAll("a, button").forEach((n) => n.setAttribute("tabindex", "-1"))
  return copy
}
