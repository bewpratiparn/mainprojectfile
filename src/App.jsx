import { useState } from 'react'
import 'flowbite'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home2 from './paeges/Home2'
import NavbarNew from './components/Navbarnew'
import Navbar from './components/Navbar'
import Login from './paeges/Login'
import Home from './paeges/Home'
import Translate from './paeges/Translate'
import AddFood from './paeges/AddFood'
import AddDataShop from './paeges/AddDataShop'
import Register from './paeges/Register'
import Store_information from './paeges/Store_information'
import Notshowfood from './paeges/Notshowfood'
import Editstore from './paeges/EditStore'
import Detailfood from './paeges/detailfood'







function App() {
  

  return (
    
      <Router>
        <NavbarNew/>
        <Home2/>
        
      <Routes> 
      
        <Route path="/Home" element={<Home />} /> 
        <Route path="/Login" element ={<Login/>} />
        <Route path="/Login" element ={<Home/>} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/Translate" element={<Translate />} /> 
        <Route path="/AddFood" element={<AddFood />} /> 
        <Route path="/AddDataShop" element={<AddDataShop />} />
        <Route path="/Store_information" element={<Store_information />} />
        <Route path="/Notshowfood" element={<Notshowfood />} />
        <Route path="/EditStore" element={<Editstore />} />
        <Route path="/Detailfood" element={<Detailfood />} />
      
       
        
        
       
        
        
        
      </Routes>
    </Router>
 
  )
}

export default App
