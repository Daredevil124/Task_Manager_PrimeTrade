const user=require('../models/auth');
const config=require('../config');
const jwt=require('jsonwebtoken');
const login=async (req,res)=>{
    try{
        const [email,password]=req.body;
        const userData=await user.findOne({email:email});
        if(!userData){
            res.status(401).send('Username not found');
        }
        else{
            const passMatch=await bcrypt.compare(password,userData.password);
            if(passMatch){
                const jwtKey=config.JWT_SECRET;
                
                const token=jwt.sign({email:userData.email,password:userData.password,Name:userData.Name},jwtKey,{expiresIn:'20h'});
                res.json({token});
            }
            else{
                res.status(401).send('Username and Password does not match!');
            }
        }
    }
    catch(error){
        res.status(500).send("Server Error ",error);
    }
}
module.exports=login;