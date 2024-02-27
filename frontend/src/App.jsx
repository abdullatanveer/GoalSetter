import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Secret from './pages/Secret';
import Home from './pages/Home';
 
import './App.css';
import Navbar from './layout/Navbar';


function App() {
   

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
       
        <Route path='/'element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Secret" element={<Secret/>}/>
      </Routes>

    </Router>
    
<ToastContainer/>
   
       </>
  )
}

export default App
