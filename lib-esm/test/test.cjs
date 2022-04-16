'use strict'
const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const {describe, it} = require('mocha')
const {expect} = require('chai')

const {makeDatabase} = require('json-database-esm')

describe('unit tests (CJS)', function () {
  let db
  before(async () => {
    const tmpDir = await fs.mkdtemp(os.tmpdir() + '/')

    db = makeDatabase(path.join(tmpDir, 'db.json'))
  })

  beforeEach(async () => {
    for (const row of await db.getRows()) await db.deleteRow(row.id)
  })

  it('should add a row', async () => {
    await db.addRow({id: 'ida', name: 'a'})
    await db.addRow({id: 'idb', name: 'b'})

    expect(await db.getRows()).to.eql([
      {id: 'ida', name: 'a'},
      {id: 'idb', name: 'b'},
    ])

    expect(await db.getRow('ida')).to.eql({id: 'ida', name: 'a'})
  })

  it('should delete a row', async () => {
    await db.addRow({id: 'ida', name: 'a'})
    await db.addRow({id: 'idb', name: 'b'})

    await db.deleteRow('ida')

    const rows = await db.getRows()
    expect(rows).to.eql([{id: 'idb', name: 'b'}])
  })

  it('should update a row', async () => {
    await db.addRow({id: 'ida', name: 'a'})
    await db.addRow({id: 'idb', name: 'b'})

    await db.updateRow('ida', {name: 'c'})

    const rows = await db.getRows()
    expect(rows).to.eql([
      {id: 'ida', name: 'c'},
      {id: 'idb', name: 'b'},
    ])
  })
})
