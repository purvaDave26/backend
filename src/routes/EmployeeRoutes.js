const router=require("express").Router()
const empController=require("../controllers/EmployyeController")


router.get("/emp/:name/:company",empController.getAllEmp)
router.get("/emp",empController.getEmp)
module.exports=router    


