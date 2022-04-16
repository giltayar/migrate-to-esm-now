import {mkdtemp} from 'fs/promises'
import {tmpdir} from 'os'
import {join} from 'path'
import {describe, it} from 'mocha'
import {expect} from 'chai'

import {makeDatabase} from 'json-database-esm'

describe('unit tests (ESM)', function () {
  let db
  before(async () => {
    const tmpDir = await mkdtemp(tmpdir() + '/')

    db = makeDatabase(join(tmpDir, 'db.json'))
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
