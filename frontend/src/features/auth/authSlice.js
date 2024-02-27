 import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
 import authService from './authService';

 //Get User from Local Storage
const user=JSON.parse(localStorage.getItem('user'));

 const initialState = {
    user: user ? user : null,
    isSuccess:false,
    isLoading:false,
    isError:false,
    message:'',
 }

 // regisster a user

 export const registerUser=createAsyncThunk('auth/register ' ,async(user ,thunkAPI)=>{
    try {
        await authService.register(user);
    } catch (error) {
        const message=(
            error.response && error.response.data && error.response.data.message ) 
            || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        
    }
     
 })
 // logout a userr
 export const logOut=createAsyncThunk ('auth/logOut',async()=>{
      authService.logOut();
 })

 export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=false;
            state.message='';

        },
         
    },
    extraReducers:(builder)=>{
     builder
      .addCase(registerUser.pending,(state)=>{
         state.isLoading=true;
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.user=action.payload;
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload;
      })
    

         
        .addCase(logOut.fulfilled, (state) => {
            state.user = null
          })
    },
    
 })

 export const {reset}=authSlice.actions;
 export default authSlice.reducer;