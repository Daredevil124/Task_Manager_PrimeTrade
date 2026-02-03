const user=require('../models/auth');
const bcrypt=require('bcrypt');
const saltRounds=10;
const signup=async (req,res)=>{
    try{
    const [name,email,password]=req.body;
    const existing=await user.find({email:email});
    if(existing){
        res.status(409).send("Email Already Exists");
    }
    else{
        const hash=await bcrypt.hash(password,saltRounds);
        const newUser=new user({email:email,password:hash,Name:name});
        await newUser.save();
        res.status(200).send("New User Created!");
    }
}
catch(error){
    res.status(500).send("Server Error: ",error);
}
}
module.exports=signup;