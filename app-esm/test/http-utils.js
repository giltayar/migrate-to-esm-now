import fetch from 'node-fetch'

export async function getJson(pathSegments) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')
  return await (await fetch(new URL(path, 'http://localhost:3000'))).json()
}

export async function postJson(pathSegments, json) {
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

export async function putJson(pathSegments, json) {
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

export async function deleteRequest(pathSegments) {
  const path = typeof pathSegments === 'string' ? pathSegments : pathSegments.join('/')

  return await (
    await fetch(new URL(path, 'http://localhost:3000'), {
      method: 'DELETE',
    })
  ).json()
}
