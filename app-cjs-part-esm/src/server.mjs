import fastify from 'fastify'
import {
  getDogs,
  getDog,
  addDog,
  updateDog,
  deleteDog,
  getPuppies,
  giveBirthToPuppy,
} from './dogs-repository.js'

export default function createApp() {
  const app = fastify()

  app.get('/api/dogs', async () => {
    return await getDogs()
  })

  app.get('/api/dogs/:id', async (req) => {
    const {id} = req.params

    return await getDog(id)
  })

  app.post('/api/dogs', async (req) => {
    const dog = req.body

    return {id: await addDog(dog)}
  })

  app.put('/api/dogs/:id', async (req) => {
    const {id} = req.params
    const dog = req.body

    await updateDog(id, dog)

    return {}
  })

  app.delete('/api/dogs/:id', async (req) => {
    const {id} = req.params

    await deleteDog(id)

    return {}
  })

  app.get('/api/dogs/:id/puppies', async (req) => {
    const {id} = req.params

    return await getPuppies(id)
  })

  app.post('/api/dogs/:id/puppies', async (req) => {
    const {id} = req.params
    const puppy = req.body

    return {id: await giveBirthToPuppy(puppy, id)}
  })

  return app
}
