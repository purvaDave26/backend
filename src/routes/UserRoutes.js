const router=require("express").Router()
const userController=require("../controllers/UserController")
const testmiddleware=require("../middlewares/TestMiddleware")
const zodmiddleware=require("../middlewares/ZodMiddleware")
const uservalidationSchema=require("../validationschemas/UserValidationSchema")
const upload=require("../middlewares/UploadMiddleware")

router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/searchuser",userController.searchUser)

// router.post("/user",userController.createUser)

router.delete("/user/:id",userController.deleteUser)

router.put("/user/:id",userController.updateUSer)
router.put("/updatebyage/:age",userController.updateByAge)

router.put("/updatedata/",userController.updateData)



// router.post("/user",testmiddleware,userController.createUser)
// router.post("/user",testmiddleware("MANAGER"),userController.createUser)
// router.post("/user",zodmiddleware(uservalidationSchema),userController.createUser)

// router.post("/user",upload.single("file"),userController.createUser)

router.post("/user",upload.array("file",3),userController.createUser)

module.exports=router