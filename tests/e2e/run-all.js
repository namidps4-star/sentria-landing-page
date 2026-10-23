// Runs every suite against APP_URL (default http://localhost:3300, a production build). Stops at the first failure.
const { spawnSync } = require('child_process')
for (const s of ['content', 'interact', 'layout', 'opening', 'a11y', 'logo', 'revamp']) {
  console.log(`\n######## ${s}`)
  const r = spawnSync('node', [`${__dirname}/${s}.js`], { stdio: 'inherit' })
  if (r.status !== 0) {
    console.log(`\nSTOPPED: ${s} failed`)
    process.exit(1)
  }
}
console.log('\nALL SUITES PASSED')
