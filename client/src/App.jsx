import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
    </div>
  )
}

export default App
