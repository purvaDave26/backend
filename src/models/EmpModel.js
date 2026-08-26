const mongoose=require("mongoose")
const Schema= mongoose.Schema

const EmpModel=new Schema({
    name:{
        type:String
    },
    deptname:{
        type:String
    },
    age:{
        type:Number
    },
    salary:{
        typr:Number
    }
    
})
module.exports=mongoose.model("employees",EmpModel)