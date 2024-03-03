import web3 from './web3'

const address = '0xBCCeCd58E6CA8267717Ab0dFA502f4522c46f17A'

const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [{ internalType: 'string', name: 'description', type: 'string' }],
    name: 'addTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'completeTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserTodos',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'bool', name: 'completed', type: 'bool' },
          { internalType: 'address', name: 'owner', type: 'address' },
        ],
        internalType: 'struct TodoList.Todo[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'todos',
    outputs: [
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'bool', name: 'completed', type: 'bool' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'index', type: 'uint256' },
      { internalType: 'string', name: 'newDescription', type: 'string' },
    ],
    name: 'updateTodoDescription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'user',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export default new web3.eth.Contract(abi, address)
