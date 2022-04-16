const fs = require('fs/promises')
const path = require('path')

module.exports.makeDatabase = function (dbTablePath) {
  async function read() {
    try {
      return JSON.parse(await fs.readFile(dbTablePath))
    } catch (err) {
      if (err.code !== 'ENOENT') throw err

      return []
    }
  }
  async function write(rows) {
    await fs.mkdir(path.dirname(dbTablePath), {recursive: true})

    return await fs.writeFile(dbTablePath, JSON.stringify(rows, null, 2))
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
