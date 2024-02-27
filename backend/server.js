const express =require('express');
const dotenv=require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
// const {goalRoutes} = require('./routes/goalRoute');
const connectDatabase=require('./config/database');
const cors=require('cors');
 



const port = process.env.PORT || 3000;
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
}


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/goals',require('./routes/goalRoute'));
app.use('/api/users',require('./routes/userRoute'));
app.use(errorHandler);
connectDatabase();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})