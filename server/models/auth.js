const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required,
        unique
    },
    password:{
        type: String.
        required,
    },
    Name:{
        type:String,
        required
    }
});
module.exports=mongoose.model('userSchema',userSchema);
