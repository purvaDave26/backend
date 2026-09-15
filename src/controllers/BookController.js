const BookModel=require("../models/BooksModel")
const BookDetailModel=require("../models/BookDetailModel")

const addBook=async(req,res)=>{
   try{
        const savedbook=await BookModel.insertOne(req.body)
   }
   catch(err)
   {
        console.log(err)
        res.json({err:err})
   }
}

module.exports={
    addBook
}