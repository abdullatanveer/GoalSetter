 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  menu from '../assets/icons/menu.png';
import {FaUser} from 'react-icons/fa'

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-sky-200'  style={{margin:0 ,padding:0}}> 
      <ul className='flex flex-row justify-between items-center h-16 px-4 ' >
        <li className='font-bold text-2xl'>
          <Link to="/">GoalSetter</Link>
        </li>
        <li className="ml-auto space-x-4 font-medium hidden md:flex">
          <Link to="/Login">Login</Link>
          <FaUser/>
          <Link to="/SignUp">  SignUp</Link>
        </li>
        <li className="md:hidden">
          <button onClick={toggleMenu} className="text-black hover:text-gray-800 focus:outline-none">
             <img src={menu} alt="menu" className="h-6 w-6" />
          </button>
        </li>
      </ul>
      {isMenuOpen && (
        <div className="md:hidden px-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/SignUp">SignUp</Link>
            </li>
          </ul>
        </div>
      )}
     </nav>
  )
}

export default Navbar;


