const task=require('../models/task');
const editTask=async(req,res)=>{
    try{
        const{status, description, dueDate,Title}=req.body;
        const userId=req.user.id;
        const taskData=await task.findOne({Title:Title, userId:userId});
         if(status !== null && status !== undefined) taskData.status = status;
        if(description !== null && description !== undefined) taskData.description = description;
        if(dueDate !== null && dueDate !== undefined) taskData.dueDate = dueDate;
        if(Title !== null && Title !== undefined) taskData.Title = Title;
        await taskData.save();
    }
    catch(error){
        res.status(500).send("Server Error ",error);
    }
}
module.exports=editTask;