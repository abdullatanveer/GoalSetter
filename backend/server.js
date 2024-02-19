const express =require('express');
const dotenv=require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
// const {goalRoutes} = require('./routes/goalRoute');
const connectDatabase=require('./config/database');



const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/goals',require('./routes/goalRoute'));
app.use('/api/users',require('./routes/userRoute'));
app.use(errorHandler);
connectDatabase();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})