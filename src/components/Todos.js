import React, { Fragment, useState, useEffect} from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
const Todos = () => {
    
    const [todosState, setTodosState] = useState([])

    useEffect(() => {
        const getTodos = async() => {
            try {
                const res = await axios.get(
                'http://jsonplaceholder.typicode.com/todos?_limit=10'
                )
                setTodosState(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getTodos()
    },[])

    

    const markComplete = id => {
        const newTodo = todosState.map(todo => {
            if(todo.id === id) todo.completed = !todo.completed
            return todo
        })
        setTodosState(newTodo)
    }

    const deleteTodo = async id => {
        try {
            await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
            const newTodo = todosState.filter(todo => {
                return todo.id !== id
            })
            setTodosState(newTodo)
        } catch (error) {
            console.log(error.massage)
        }
    }

    const addTodo = async title => {
       try {
           const res = await axios.post(
            'http://jsonplaceholder.typicode.com/todos', {
                title,
                completed: false
            }
           )
          const newTodo = [...todosState, res.data]
        setTodosState(newTodo)
       } catch (error) {
           console.log(error.message)
       }
    }

  
    return (
        <Fragment>
            <AddTodo addTodoFunc={addTodo}/>
          {todosState.map(todo => {
              return <TodoItem key={todo.id}
               todoProps={todo} 
              markCompleteFunc = {markComplete}
              deleteTodoFunc = {deleteTodo}
              />
          })}
        </Fragment>
    )
}

export default Todos