const router=require("express").Router()
const empController=require("../controllers/EmployyeController")


router.get("/emp/:name/:company",empController.getAllEmp)
module.exports=router