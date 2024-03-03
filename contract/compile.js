const path = require('path')
const fs = require('fs')
const solc = require('solc')

const todoListPath = path.resolve(__dirname, 'contracts', 'TodoList.sol')
const source = fs.readFileSync(todoListPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'TodoList.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'TodoList.sol'
].TodoList