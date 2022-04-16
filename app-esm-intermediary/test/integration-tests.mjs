import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import createApp from '../src/server.mjs'
import {getJson, deleteRequest, postJson, putJson} from './http-utils.js'

describe('integration tests ()', function () {
  before(async () => {
    await createApp().listen(3000)
  })

  beforeEach(
    async () =>
      await Promise.all(
        (await getJson('/api/dogs')).map((dog) => deleteRequest(['/api/dogs', dog.id])),
      ),
  )

  it('should list empty dogs', async () => {
    expect(await getJson('/api/dogs')).to.eql([])
  })

  it('should add a dog', async () => {
    const {id: d1} = await postJson('/api/dogs', {name: 'd1'})
    const {id: d2} = await postJson('/api/dogs', {name: 'd2'})

    const dogs = await getJson('/api/dogs')

    expect(dogs).to.have.length(2)
    expect(dogs[0].name).to.equal('d1')
    expect(dogs[1].name).to.equal('d2')

    expect((await getJson(['/api/dogs', d1])).name).to.equal('d1')
    expect((await getJson(['/api/dogs', d2])).name).to.equal('d2')
  })

  it('should delete a dog', async () => {
    const {id: d1} = await postJson('/api/dogs', {name: 'd1'})
    await postJson('/api/dogs', {name: 'd2'})

    await deleteRequest(['/api/dogs', d1])

    const dogs = await getJson('/api/dogs')

    expect(dogs).to.have.length(1)
    expect(dogs[0].name).to.equal('d2')
  })

  it('should update a dog', async () => {
    const {id: d1} = await postJson('/api/dogs', {name: 'd1'})
    await postJson('/api/dogs', {name: 'd2'})

    await putJson(['/api/dogs', d1], {name: 'dd1'})

    const dogs = await getJson('/api/dogs')

    expect(dogs).to.have.length(2)
    expect(dogs[0].name).to.equal('dd1')
    expect(dogs[1].name).to.equal('d2')
  })

  it('should add a puppy', async () => {
    const {id: d1} = await postJson('/api/dogs', {name: 'd1'})
    const {id: d2} = await postJson('/api/dogs', {name: 'd2'})

    await postJson(['/api/dogs', d1, 'puppies'], {name: 'p1'})
    await postJson(['/api/dogs', d1, 'puppies'], {name: 'p2'})
    await postJson(['/api/dogs', d2, 'puppies'], {name: 'pp1'})

    const dogs = await getJson('/api/dogs')

    expect(dogs).to.have.length(5)
    const d1Puppies = await getJson(['/api/dogs', d1, 'puppies'])
    const d2Puppies = await getJson(['/api/dogs', d2, 'puppies'])

    expect(d1Puppies).to.have.length(2)
    expect(d1Puppies[0].name).to.equal('p1')
    expect(d1Puppies[1].name).to.equal('p2')

    const p1Puppy = await getJson(['/api/dogs', d1Puppies[0].id])
    expect(p1Puppy.name).to.equal('p1')
    expect(p1Puppy.parentId).to.equal(d1)

    expect(d2Puppies).to.have.length(1)

    const p2Puppy = await getJson(['/api/dogs', d2Puppies[0].id])
    expect(p2Puppy.name).to.equal('pp1')
    expect(p2Puppy.parentId).to.equal(d2)
  })

  it('deleting a puppy should delete it from parent', async () => {
    const {id: d1} = await postJson('/api/dogs', {name: 'd1'})

    const {id: p1} = await postJson(['/api/dogs', d1, 'puppies'], {name: 'p1'})
    const {id: p2} = await postJson(['/api/dogs', d1, 'puppies'], {name: 'p2'})

    await deleteRequest(['/api/dogs', p1])

    const d1Puppies = await getJson(['/api/dogs', d1, 'puppies'])
    expect(d1Puppies).to.have.length(1)
    expect(d1Puppies[0].name).to.equal('p2')
  })
})
