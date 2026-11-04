@AGENTS.md

## Standing rule: better UI / front-end design requests

Whenever the user asks for a better UI, a better look, or better front-end design, in any session:

- Never produce a rough draft. Deliver finished, polished work only.
- Always screenshot the current state first, then build the improved version and screenshot it too. Show both, before and after.
- Check the result at phone width (390 px) and desktop width, and confirm no horizontal overflow. Only show the user desktop screenshots; do not send phone views unless they ask.
- Use only fonts we are allowed to use. No Google Fonts.
- Before starting UI work, load these skills with the Skill tool and use them when they fit the task:
  - `impeccable` (taste, critique, audit, polish, layout, typography, motion). Source: `.claude/skills/impeccable/`, Apache 2.0.
  - `ui-ux-pro-max` (styles, palettes, font pairings, UX rules). Source: `.claude/skills/ui-ux-pro-max/`, MIT.
  - Any other front-end design skill listed in the session.
  Do not skip this step.
- For scroll-driven or "fly through the world" landing pages (scroll-scrubbed video, 3D world, diorama hero, scroll cinematic), always load the `scroll-world` skill first. Its generation runs cost money (Monid, Higgsfield), so state the cost and get a go-ahead before rendering.
