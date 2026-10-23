// Shared settings for the browser suites. Override with environment variables:
//   E2E_URL     the app to test (default http://localhost:3300)
//   E2E_CHROME  a Chromium binary (default: the one Playwright manages)
//   E2E_SHOTS   where screenshots go (default tests/e2e/shots, git-ignored)
const fs = require('fs')
const path = require('path')

const SHOTS = process.env.E2E_SHOTS || path.join(__dirname, 'shots')
fs.mkdirSync(SHOTS, { recursive: true })

const CLOUD_CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const chrome = process.env.E2E_CHROME || (fs.existsSync(CLOUD_CHROME) ? CLOUD_CHROME : undefined)

function playwright() {
  try {
    return require('playwright')
  } catch (e) {
    return require('/opt/node-tools/node_modules/playwright')
  }
}

const results = { fails: 0 }
const pass = (ok, label) => {
  if (!ok) results.fails++
  console.log(`   ${ok ? 'PASS' : 'FAIL'} ${label}`)
}

// Calls to other sites (Calendly, fonts) are not reachable in every sandbox; they are not the app's errors.
const IGNORED_ERRORS = /ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|calendly|permissions policy violation: payment/i

module.exports = {
  APP_URL: process.env.E2E_URL || 'http://localhost:3300',
  LAUNCH: chrome ? { executablePath: chrome } : {},
  SHOTS,
  playwright,
  pass,
  results,
  IGNORED_ERRORS,
  LEGACY: path.join(__dirname, '..', '..', 'legacy', 'index.html'),
}
