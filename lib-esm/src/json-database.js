import {readFile, mkdir, writeFile} from 'fs/promises'
import {dirname} from 'path'

export function makeDatabase(dbTablePath) {
  async function read() {
    try {
      return JSON.parse(await readFile(dbTablePath))
    } catch (err) {
      if (err.code !== 'ENOENT') throw err

      return []
    }
  }
  async function write(rows) {
    await mkdir(dirname(dbTablePath), {recursive: true})

    return await writeFile(dbTablePath, JSON.stringify(rows, null, 2))
  }

  async function getRow(id) {
    return (await read()).find((entity) => entity.id === id)
  }

  async function getRows(id) {
    return await read()
  }

  async function addRow(entity) {
    return await write([...(await read()), entity])
  }

  async function deleteRow(entityId) {
    return await write((await read()).filter((entity) => entity.id !== entityId))
  }

  async function updateRow(entityId, updated) {
    return await write(
      (
        await read()
      ).map((entity) => (entity.id === entityId ? {id: entityId, ...updated} : entity)),
    )
  }

  return {getRow, getRows, addRow, deleteRow, updateRow}
}
