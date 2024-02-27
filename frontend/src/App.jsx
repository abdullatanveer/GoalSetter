import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Secret from './pages/Secret';
 
import './App.css';
import Navbar from './layout/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Secret" element={<Secret/>}/>
      </Routes>

    </Router>
    
<ToastContainer/>
    <h1 className="text-3xl font-bold underline text-center text-blue-900">Hello world!</h1>
    <h1>{count}</h1>
       </>
  )
}

export default App
