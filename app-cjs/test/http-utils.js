const fetch = require('node-fetch')

async function getJson(pathSegments) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')
  return await (await fetch(new URL(path, 'http://localhost:3000'))).json()
}
exports.getJson = getJson

async function postJson(pathSegments, json) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')
  return await (
    await fetch(new URL(path, 'http://localhost:3000'), {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()
}
exports.postJson = postJson

async function putJson(pathSegments, json) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')
  return await (
    await fetch(new URL(path, 'http://localhost:3000'), {
      method: 'PUT',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()
}
exports.putJson = putJson

async function deleteRequest(pathSegments) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')

  return await (
    await fetch(new URL(path, 'http://localhost:3000'), {
      method: 'DELETE',
    })
  ).json()
}
exports.deleteRequest = deleteRequest
