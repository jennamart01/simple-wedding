#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
const stale = ['200.html']
for (const f of stale) {
  try {
    fs.rmSync(new URL(f, dist), { force: true })
  } catch {
    /* ignore */
  }
}

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'].find((p) => fs.existsSync(p))

const env = { ...process.env, PUPPETEER_EXECUTABLE_PATH: chrome || '' }
const result = spawnSync('npx', ['react-snap'], { env, stdio: 'inherit' })
process.exit(result.status ?? 1)
