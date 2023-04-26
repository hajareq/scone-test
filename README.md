## Prerequisites

1. [Node.js](https://nodejs.org) and [npm](https://npmjs.com) installed.

## Installation

1. Clone or download this repository.
4. Install the dependencies: `npm install`.

## Usage

1. This project is in Typescript so you first need to run the build command `npm run build`.
2. Navigate to the build directory `cd build/`.
3. Run the CLI via `node app.js <command>`.

### Filter animals by pattern

Use the command `--filter=<pattern>` where pattern is the filter patter. Ie: `node app.js --filter=ry`.

### Get Children Count

Use the command `--count`: `node app.js --count`.


## Testing

To launch unit tests run the test command under the main directory `npm run test`.