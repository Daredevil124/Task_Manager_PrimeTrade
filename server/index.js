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
});

const uri=config.MONGO_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',()=>{console.log("Error connecting to databse")});
db.once('open',()=>{console.log("Connected to Database!")});
