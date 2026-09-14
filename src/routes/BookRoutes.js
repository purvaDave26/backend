const router=require("express").Router()
const BookController=require("../controllers/BookController")


router.post("/books",BookController.addBook)

module.exports=router
