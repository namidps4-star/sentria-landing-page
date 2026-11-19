import type { MouseEvent as ReactMouseEvent } from "react"
import "./africa-globe-roll.css"

const EARTH = "/africa/earth-blue-marble.jpg"
const START_LON = -100 // the globe starts over the Americas
const AFRICA_LON = 20 // the middle of Africa
const DURATION = 1400
const DEG = Math.PI / 180

/* Shows a lit 3D globe that rolls from the Americas to Africa, then opens the page. Reduced motion skips straight there. */
export function rollGlobeClick(e: ReactMouseEvent, href: string): void {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  void rollGlobeTo(href)
}

async function rollGlobeTo(href: string): Promise<void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.location.assign(href)
    return
  }
  if (document.querySelector(".globe-roll")) return

  const overlay = document.createElement("div")
  overlay.className = "globe-roll"
  overlay.setAttribute("aria-hidden", "true")
  const arc = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  arc.setAttribute("class", "globe-roll__arc")
  arc.setAttribute("viewBox", "0 0 600 600")
  arc.setAttribute("aria-hidden", "true")
  arc.innerHTML =
    '<defs><path id="globe-roll-arc" d="M 20 300 A 280 280 0 0 1 580 300" /></defs>' +
    '<text><textPath href="#globe-roll-arc" startOffset="50%" text-anchor="middle">SentrIA Africa</textPath></text>'
  const canvas = document.createElement("canvas")
  overlay.append(arc, canvas)
  document.body.appendChild(overlay)

  const THREE = await import("three")
  const size = Math.round(Math.min(520, Math.min(window.innerWidth, window.innerHeight) * 0.62))
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(size, size, false)
  renderer.setClearColor(0x0b0c08, 1)
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.z = 4.2

  const material = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 })
  const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), material)
  globe.rotation.x = 0.12
  scene.add(globe)
  scene.add(new THREE.AmbientLight(0xffffff, 0.35))
  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.set(-3, 1.5, 3)
  scene.add(sun)

  // Calibrated on the texture: a longitude faces the camera at rotation.y = -(lon + 70) degrees; Africa centres best at -(lon + 80).
  const fromAngle = -(START_LON + 70) * DEG
  const toAngle = -(AFRICA_LON + 80) * DEG

  new THREE.TextureLoader().load(EARTH, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
    material.map = texture
    material.needsUpdate = true
    overlay.dataset.on = "1"
    const t0 = performance.now()
    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION)
      const eased = 1 - Math.pow(1 - t, 3)
      globe.rotation.y = fromAngle + (toAngle - fromAngle) * eased
      renderer.render(scene, camera)
      if (t < 1) requestAnimationFrame(frame)
      else {
        renderer.dispose()
        window.location.assign(href)
      }
    }
    requestAnimationFrame(frame)
  })
}
