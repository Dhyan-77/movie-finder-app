import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Favorites from './Components/Favorites'
import Navbar from './Components/Navbar'
import Detail from './Components/Detail'

const App = () => {
  
  return (
    <div className="" >
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/fav' element={<Favorites/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
     </Routes>
    </div>
  )
}

export default App