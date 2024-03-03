import web3 from './web3'

const address = '0x6C0a73eACDf1B6583661556D5CC062D14EdA2f1b'

const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [[Object]],
    name: 'addTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [[Object]],
    name: 'completeTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserTodos',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [[Object]],
    name: 'todos',
    outputs: [[Object], [Object], [Object]],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [[Object], [Object]],
    name: 'updateTodoDescription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'user',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function',
  },
]

export default new web3.eth.Contract(abi, address)