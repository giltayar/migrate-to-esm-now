#!/usr/bin/env node
import createApp from './server.js'

const app = createApp()

const port = process.env.PORT ?? 3000

await app.listen(port, '0.0.0.0')

console.log(`Listening on port ${port}`)
