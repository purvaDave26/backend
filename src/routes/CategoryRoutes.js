const router=require("express").Router()
const categoriesController=require("../controllers/CategoryController")
const { route } = require("./UserRoutes")

router.post("/",categoriesController.createCategory)

router.get("/",categoriesController.getAllCategory)

module.exports=router