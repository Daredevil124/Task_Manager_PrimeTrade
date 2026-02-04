const task=require('../models/task');
const deleteTask=async(req,res)=>{
    try{
    const {Title}=req.body;
    const id=req.user.id;
    await task.deleteOne({userId:id,Title:Title});
    res.status(200).send('Successfully Deleted');
    }
    catch(error){
        res.status(500).send('Server Error',error);
    }
}