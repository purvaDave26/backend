const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userModel=new Schema({
     name:{
     type:String   
    },
    age:{
        type:Number
    },
    bloodGrp:{
            type:String,
            enum:["A+","B+","AB+","A-","AB-","B-"]
    },
    skills:[{
        type:String
    }],
    address:{
        type:Object
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("users",userModel)