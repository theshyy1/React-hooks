import React, { Fragment } from 'react'
import Header from './components/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import './App.css';



const App = () => {
  return (
    <Fragment>
      <Header />
      <AddTodo />
      <Todos />
    </Fragment>
  )
}

export default App;
