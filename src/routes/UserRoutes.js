const router=require("express").Router()
const userController=require("../controllers/UserController")

router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/searchuser",userController.searchUser)

router.post("/user",userController.createUser)
module.exports=router