import type { CapabilityIcon } from "@/content/africa-activities"

const PATHS: Record<CapabilityIcon, string> = {
  box: "M3 8l9-5 9 5v8l-9 5-9-5V8z M3 8l9 5 9-5 M12 13v8",
  calendar: "M4 5h16v15H4z M4 10h16 M8 3v4 M16 3v4 M9 15l2 2 4-4",
  check: "M9 4h6v3H9z M7 5H5v16h14V5h-2 M9 14l2 2 4-4",
  clock: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M12 7v5l3 2",
  transfer: "M4 8h13 M13 4l4 4-4 4 M20 16H7 M11 12l-4 4 4 4",
  rank: "M5 20V10 M12 20V4 M19 20v-7",
  thermo: "M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z",
  alert: "M12 3l10 18H2L12 3z M12 10v5 M12 18v.5",
}

/** Drawn icon paths on a 24 x 24 grid, one stroke weight. Render inside an <svg>. */
export function IconPath({ name }: { name: CapabilityIcon }) {
  return <path d={PATHS[name]} />
}
