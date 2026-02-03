const task=require('../models/task');
const user=require('../models/auth');
const addTask=async(req,res)=>{
    try{
    const [email,date,description,status,title]=req.body;
    const userData=await user.findOne({email:email});
    const newTask=new task({userId:userData._id,Title:title,dueDate:date,description:description,status:status});
    await newTask.save();
    res.status(200).send('Task added Successfully');
    }
    catch(error){
        res.status(500).send("Server Error ",error);
    }
}
module.exports=addTask;