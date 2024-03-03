import React, { useEffect, useState } from 'react'
import web3 from './web3'
import todolist from './todolist'

const App = () => {
  const [user, setUser] = useState('')
  const [description, setDescription] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      const user = await todolist.methods.user().call()
      setUser(user)
      const userTodos = await todolist.methods
        .getUserTodos()
        .call({ from: user })
      setTodos(userTodos)
    }

    fetchData()
  }, [])

  const handleAddTodo = async () => {
    try {
      await todolist.methods.addTodo(description).send({ from: user })
      // 할 일을 추가한 후에 사용자의 할 일 목록을 다시 가져오는 등의 작업을 수행할 수 있습니다.
      const userTodos = await todolist.methods
        .getUserTodos()
        .call({ from: user })
      setTodos(userTodos)
      console.log('Todo added successfully!')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const handleCompleteTodo = async (index) => {
    try {
      await todolist.methods.completeTodo(index).send({ from: user })
      // 할 일을 완료한 후에 사용자의 할 일 목록을 다시 가져오는 등의 작업을 수행할 수 있습니다.
      const userTodos = await todolist.methods
        .getUserTodos()
        .call({ from: user })
      setTodos(userTodos)
      console.log('Todo completed successfully!')
    } catch (error) {
      console.error('Error completing todo:', error)
    }
  }

  return (
    <div>
      <h2>Todo List!!!</h2>
      <p>User ID: {user}</p>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.description} - {todo.completed ? 'Completed' : 'Pending'}
            <button onClick={() => handleCompleteTodo(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App