import {mkdtemp} from 'fs/promises'
import {tmpdir} from 'os'
import {join} from 'path'
import {makeDatabase} from 'json-database-esm'

const tmpDir = await mkdtemp(tmpdir() + '/')

const db = makeDatabase(join(tmpDir, 'db.json'))

await db.addRow({name: 'a'})

console.log(await db.getRows())
