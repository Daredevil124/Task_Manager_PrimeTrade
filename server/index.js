const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const config=require('./config');
const PORT=config.PORT;
app.use(cors());
app.use(express.json());
app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}`);
})