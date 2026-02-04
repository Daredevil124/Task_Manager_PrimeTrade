const user=require('../models/auth');
const update=async(req,res)=>{
    try{
    const {name}=req.body;
    const id=req.user.id;
    const data=user.findById(id);
    data.name=name;
    }
    catch (error){
        res.status(500).send(false);
    }
}
module.exports=update;