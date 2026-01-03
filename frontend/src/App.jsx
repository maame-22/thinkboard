import React from 'react'
import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Create from './pages/Create'
import Update from './pages/Update'
const App = () => {
  return (
  <div className='relative w-full h-full' data-theme ="forest">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
   <Routes>
    <Route path='/' element ={<HomePage/>} />
    <Route path='/create' element ={<Create/>} />
    <Route path='/update/:id' element ={<Update/>} />
   </Routes>
   </div>
  )
}

export default App