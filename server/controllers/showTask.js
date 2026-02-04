const task=require('../models/task');
const logins=require('../models/auth');
const showTask=async(req,res)=>{
    try{
    const userId=req.user.id;
    const taskData=await task.find({userId:userId});
    const userDetails=await logins.find({userId:userId,userDetails});
    res.status(200).send({taskData});
    }
    catch(error){
        res.status(500).send("Server Error",error);
    }
}
module.exports=showTask;