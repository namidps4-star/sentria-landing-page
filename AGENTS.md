<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Folder rules (labeled drawers)
- `app/`: screens and routes only. One folder per route, one `page.tsx` per screen.
- `components/`: pieces used on more than one screen. One copy, used everywhere. Never copy a button or card; import it.
- `content/`: the text and data pages read (copy, prices, article lists). No layout code here.
- One job per file. No file over 300 lines; split it when you touch it, or name the exception in the commit message.
- Before writing anything new, search for an existing one first.
- Cleanup: one folder per step, a Git commit as save point before, no behaviour change, click through after.
