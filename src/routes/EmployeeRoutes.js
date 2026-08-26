const router=require("express").Router()
const empController=require("../controllers/EmployyeController")


router.get("/emp/:name/:company",empController.getAllEmp)
router.get("/emp",empController.getEmp)
router.get("/empbyid/:id",empController.EmpByID)
router.get("/searchemp",empController.searchEmp)

router.post("/createmp",empController.createEmp)
module.exports=router    


