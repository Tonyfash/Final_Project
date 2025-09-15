require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const DB = process.env.DB_URI;
const userRouter = require('./routes/userRoute');

app.use(express.json());
app.get("/", (req, res)=>{
    res.send("Welcome to my Final Class App!")
})

app.use((error, req, res, next)=>{
    if(error){
        return res.status(500).json({
            message: error.message
        })
    }
})

mongoose.connect(DB).then(()=>{
    console.log("Database is connected successfully");
    app.listen(PORT, ()=>{
        console.log('Server is running on the PORT', PORT);
    })
}).catch((error)=> {
    console.log(`Error connecting to database: ${error.message}`);
    
})