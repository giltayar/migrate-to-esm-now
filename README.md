# The Time to Migrate to ESM in Node.js is Now

Code from the talk by the same name.

## Description of directories

(The order here is the order the subject is represented in the talks)

1. `cjs-that-uses-mem-cjs`: CJS code that uses a CJS package.
   - To check it out: `npm install && npm start`
1. `cjs-that-uses-mem-ems`: CJS code that tries to use an ESM package, in various ways
   - To check it out: `npm install && npm start`
   - The three ways are:
     - `require` the ESM package. Fails.
     - dynamically imports it. Works, but hackish.
     - Just uses ESM.
1. `app-cjs`: a CJS microservice that has a few files with code in it
   - To check it out: `npm install && npm test`
   - To run the microservice: `npm start`
1. `app-cjs-part-esm`: a CJS microservice that is partially transformed to ESM
   - To check it out: `npm install && npm test`
   - To run the microservice: `npm start`
1. `app-esm`: The microservice above, transformed into ESM
   - To check it out: `npm install && npm test`
   - To run the microservice: `npm start`
1. `lib-cjs`: a library that implements a JSON database.
   - To check it out: `npm install && npm test`
1. `lib-esm`: same library as above, but using ESM, and can also dual-mode as CJS
   - To check it out: `npm install && npm test`
1. `use-lib-cjs`: code that uses the above CJS library
   - To check it out: `npm install && npm start`
1. `use-lib-esm`: code that uses the above ESM library, both via ESM and via CJS
   - To check it out: `npm install && npm start`
