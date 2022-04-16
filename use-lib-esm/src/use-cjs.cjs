'use strict'
const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const {makeDatabase} = require('json-database-esm')

async function main() {
  const tmpDir = await fs.mkdtemp(os.tmpdir() + '/')

  const db = makeDatabase(path.join(tmpDir, 'db.json'))

  await db.addRow({name: 'a'})

  console.log(await db.getRows())
}

main().catch(console.error)
