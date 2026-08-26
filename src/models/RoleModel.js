const mongoose=require("mongoose")
const Schema=mongoose.Schema

const RoleModel=new Schema({
    name:{
        type:String
    },
    status:{
        type:Boolean
    }
})

module.exports=mongoose.model("role",RoleModel)