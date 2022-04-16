'use strict'
import {spawn} from 'child_process'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import retry from 'p-retry'
import {getJson} from './http-utils.js'

describe('e2e test', function () {
  it('should add a dog', async () => {
    const childProcess = spawn('node', ['src/run-server.js'])

    await retry(async () => expect(await getJson('/api/dogs')).to.be.instanceOf(Array))

    childProcess.kill()
  })
})
