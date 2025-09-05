import { useState } from 'react'
import Navbar from "./components/navbar"
import './App.css'
import Manager from './components/manager'

function App() {

  return (
    <>
    <div>
      <Navbar/>
      <Manager/>
    </div>
    </>
  )
}

export default App
