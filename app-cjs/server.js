const fastify = require( 'fastify')
const dogs = require('./dogs-repository.js')

module.exports = function createApp() {
  const app = fastify()

  app.get('/api/dogs', async () => {
    return await dogs.getDogs()
  })

  app.get('/api/dogs/:id', async (req) => {
    const {id} = req.params

    return await dogs.getDog(id)
  })

  app.post('/api/dogs', async (req) => {
    const dog = req.body

    return {id: await dogs.addDog(dog)}
  })

  app.put('/api/dogs/:id', async (req) => {
    const {id} = req.params
    const dog = req.body

    await dogs.updateDog(id, dog)

    return {}
  })

  app.delete('/api/dogs/:id', async (req) => {
    const {id} = req.params

    await dogs.deleteDog(id)

    return {}
  })

  app.get('/api/dogs/:id/puppies', async (req) => {
    const {id} = req.params

    return await dogs.getPuppies(id)
  })


  app.post('/api/dogs/:id/puppies', async (req) => {
    const {id} = req.params
    const puppy = req.body

    return {id: await dogs.giveBirthToPuppy(puppy, id)}
  })

  return app
}
