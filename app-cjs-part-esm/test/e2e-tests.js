'use strict'
const {spawn} = require('child_process')
const {describe, it} = require('mocha')
const {expect} = require('chai')
const retry = require('p-retry')
const {getJson} = require('./http-utils')

describe('e2e test', function () {
  it('should add a dog', async () => {
    const childProcess = spawn('node', ['src/run-server.js'])

    await retry(async () => expect(await getJson('/api/dogs')).to.be.instanceOf(Array))

    childProcess.kill()
  })
})
