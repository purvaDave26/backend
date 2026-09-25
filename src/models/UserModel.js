const mongoose=require("mongoose")
const { object } = require("zod")
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
    },
    profilepicUrl:{
        type:String
    },
    profileThumnails:[
    {
        type:String
    }
    ],
    roleId:{
        type:mongoose.Schema.ObjectId,
         ref:"role"
    },
    refreshToken:{
        type:String
    }

})

module.exports=mongoose.model("users1",userModel)