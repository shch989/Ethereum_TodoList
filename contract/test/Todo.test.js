const assert = require('assert')
const ganache = require('ganache')
const { Web3 } = require('web3')
const web3 = new Web3(ganache.provider())

const { abi, evm } = require('../compile')

let accounts
let todoList

beforeEach(async () => {
  // Ganache에서 테스트용 계정 가져오기
  accounts = await web3.eth.getAccounts()
  // TodoList 컨트랙트 배포
  todoList = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('TodoList Contract', () => {
  it('deploys a contract', () => {
    // 배포된 컨트랙트 주소가 존재하는지 확인
    assert.ok(todoList.options.address)
  })

  it('adds a new todo', async () => {
    // 할 일 추가 함수 호출
    await todoList.methods.addTodo('Test Todo').send({
      from: accounts[0],
      gas: '1000000',
    })

    // 사용자의 할 일 목록 가져오기
    const userTodos = await todoList.methods.getUserTodos().call()

    // 할 일 목록에 새로운 할 일이 추가되었는지 확인
    assert.equal(userTodos.length, 1)
    assert.equal(userTodos[0].description, 'Test Todo')
    assert.equal(userTodos[0].completed, false)
    assert.equal(userTodos[0].owner, accounts[0])
  })
})
