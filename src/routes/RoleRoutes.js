const router=require("express").Router()
const roleController=require("../controllers/RoleController")

router.get("/roles",roleController.getAllRole)

router.post("/role",roleController.createRole)
module.exports=router