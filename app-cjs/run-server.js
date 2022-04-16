#!/usr/bin/env node
const createApp = require("./server.js");

async function main() {
  const app = createApp();

  const port = process.env.PORT ?? 3000

  await app.listen(port, "0.0.0.0");

  console.log(`Listening on port ${port}`);
}

main().catch(async (err) => {
  try {
    console.error("Webserver crashed", err.stack || err);
  } finally {
    process.exit(1);
  }
});
