const mongoose =require("mongoose");
const Schema=mongoose.Schema

const BookModel=new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
})
module.exports=mongoose.model("books",BookModel)