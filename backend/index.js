const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config()

const db = process.env.DATABASE_URL;

if (!db){
    console.error("Database Url not found please add .env file")
}

const app = express();
app.use(cors());
app.use(express.json());


app.use('/user',userRouter);
app.use('/admin',adminRouter);



app.get("/health", (req,res)=>{res.send("Server working now.")});

mongoose.connect(db).then((dbo)=>{
    console.log("Database connected now.")
},(err)=>{
    console.log("Error"+ err);
})

app.listen(3000, () => {console.log("listening now ... ")})
