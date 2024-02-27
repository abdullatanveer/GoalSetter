import axios from 'axios';

const API_URL="http://localhost:8000/api/users";

// register a user
export const register= async(userData)=>{

        const response=await axios.post(`${API_URL}/register`,userData);
         if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data));
       }
       return response.data;
    
     

}
// logout a user
export const logOut=()=>{
      localStorage.removeItem('user');
}

const authService={
    register,
    logOut,
}
export default authService;