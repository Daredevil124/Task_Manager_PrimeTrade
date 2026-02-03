const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userSchema',
        required
    },
    Title:{
        type:String,
        required,
    },
    dueDate:{
        type:Date,
        required,
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['Pending','Completed','Discarded','In Progress'],
        required,
    }
},{timestamps:true});
module.exports=mongoose.model('taskSchema',taskSchema);