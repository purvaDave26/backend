const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const BookDetailModel=new Schema({
    bookid:{
        type:mongoose.Schema.ObjectId,
        ref:"books"
    },
    price:{
        type:Number
    },
    cover:{
        type:String
    },
    pages:{
        type:Number
    },
    publishyear:{
        type:Number
    },
    status:{
        type:Boolean
    }
})

module.exports=mongoose.model("bookdetail",BookDetailModel)