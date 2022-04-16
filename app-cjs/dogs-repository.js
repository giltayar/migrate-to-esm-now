const { makeDatabase } = require("./json-database.js");
const { randomUUID } = require("crypto");

const db = makeDatabase(".db/dogs.json");

module.exports.getDog = async function (id) {
  const dog = await db.getRow(id);

  return { ...dog, puppies: undefined };
};

module.exports.getDogs = async function (id) {
  const dogs = await db.getRows();

  return dogs.map((dog) => ({ ...dog, puppies: undefined }));
};

module.exports.getPuppies = async function (parentId) {
  const parent = await db.getRow(parentId);

  return await Promise.all(
    (parent.puppies ?? []).map((pId) => module.exports.getDog(pId))
  );
};

module.exports.addDog = async function (dog) {
  const id = randomUUID();

  await db.addRow({ id, ...dog, puppies: [] });

  return id;
};

module.exports.giveBirthToPuppy = async function (puppy, parentId) {
  const parent = await db.getRow(parentId);

  const puppyId = await module.exports.addDog({ parentId, ...puppy });

  await db.updateRow(parentId, {
    ...parent,
    puppies: [...parent.puppies, puppyId],
  });

  return puppyId;
};

module.exports.deleteDog = async function (id) {
  const dog = await db.getRow(id);

  if (dog.parentId) {
    const parent = await db.getRow(dog.parentId);

    await db.updateRow(dog.parentId, {
      ...parent,
      puppies: parent.puppies.filter((pId) => pId !== id),
    });
  }

  await db.deleteRow(id);

  return id;
};

module.exports.updateDog = async function (id, updatedDog) {
  const dog = await db.getRow(id);

  await db.updateRow(id, { ...updatedDog, puppies: dog.puppies });
};
