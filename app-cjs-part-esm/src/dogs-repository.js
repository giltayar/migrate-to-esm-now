const {makeDatabase} = require('./json-database.js')
const {randomUUID} = require('crypto')
const {makeMutex} = require('./mutex')

const db = makeDatabase('.db/dogs.json')

const mutex = makeMutex()

module.exports.getDog = async function (id) {
  await mutex.lock()

  try {
    const dog = await db.getRow(id)

    return {...dog, puppies: undefined}
  } finally {
    await mutex.unlock()
  }
}

module.exports.getDogs = async function (id) {
  await mutex.lock()

  try {
    const dogs = await db.getRows()

    return dogs.map((dog) => ({...dog, puppies: undefined}))
  } finally {
    await mutex.unlock()
  }
}

module.exports.getPuppies = async function (parentId) {
  await mutex.lock()

  try {
    const parent = await db.getRow(parentId)

    return await Promise.all(
      (parent.puppies ?? []).map((pId) =>
        db.getRow(pId).then((puppy) => ({...puppy, puppies: undefined})),
      ),
    )
  } finally {
    await mutex.unlock()
  }
}

module.exports.addDog = async function (dog) {
  const id = randomUUID()

  await db.addRow({id, ...dog, puppies: []})

  return id
}

module.exports.giveBirthToPuppy = async function (puppy, parentId) {
  await mutex.lock()

  try {
    const parent = await db.getRow(parentId)
    const id = randomUUID()

    await db.addRow({id, parentId, ...puppy, puppies: []})

    await db.updateRow(parentId, {
      ...parent,
      puppies: [...parent.puppies, id],
    })

    return id
  } finally {
    await mutex.unlock()
  }
}

module.exports.deleteDog = async function (id) {
  await mutex.lock()

  try {
    const dog = await db.getRow(id)

    if (dog.parentId) {
      const parent = await db.getRow(dog.parentId)

      if (parent) {
        await db.updateRow(dog.parentId, {
          ...parent,
          puppies: parent.puppies.filter((pId) => pId !== id),
        })
      }
    }

    await db.deleteRow(id)

    return id
  } finally {
    await mutex.unlock()
  }
}

module.exports.updateDog = async function (id, updatedDog) {
  await mutex.lock()

  try {
    const dog = await db.getRow(id)

    await db.updateRow(id, {...updatedDog, puppies: dog.puppies})
  } finally {
    await mutex.unlock()
  }
}
