import React ,{useState,useEffect} from 'react'
import{FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {registerUser,reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
 

const Login = () => {

  const [formData, setFormData] = useState({
     
    email:'',
    password:'',
    
  })
  const {name,email,password,password2} = formData;
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user,isSuccess,isError,message,isLoading}=useSelector((state)=>state.auth);

  // watching for side-effects
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      // alert('Registration Successful')
      navigate('/Secret')
    }

    dispatch(reset());

  },[isSuccess,isError,user,message,navigate,dispatch])

  const onChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
   }
  const submitForm = (e)=>{
    e.preventDefault();
    if(password!==password2){
      toast.error('Passwords do not match');
    } else{
      const userData={name,email,password};
      dispatch(registerUser(userData));
    }
    // if(isLoading){
    //   return <Spinner/>
    // }
    // console.log(formData);
  }
   

  return (
     <>
     <section className='flex flex-col mt-20'>
       <div className='flex flex-row items-center justify-center mx-300 space-x-5'>
       <FaUser/>
       <h1 className='text-center text-2xl'>Please create an account  </h1>
       
       </div>
       <form className='flex flex-col items-center justify-center space-y-5' onSubmit={submitForm}>
          <input type='text' placeholder='Name'name="name" value={name} onChange={onChange} className='focus:ring-2 focus:ring-blue-500  border-2 focus:outline-none  border-gray-300 p-2 w-{600}'/>
          <input type='email' placeholder='Email'name="email" value={email} onChange={onChange} className='border-2 border-gray-300 p-2'/>
          <input type='password' placeholder='Password'name="password" value={password} onChange={onChange} className='border-2 border-gray-300 p-2'/>
          <input type='password' placeholder='Confirm Password'name="password2" value={password2} onChange={onChange} className='border-2 border-gray-300 p-2'/>
          <button className='bg-blue-500 text-white p-2 rounded-md w-300' type='submit'> Sign Up</button>
        </form>

     </section>
     {isLoading && <Spinner/>}
     </>
  )
}

export default Login;