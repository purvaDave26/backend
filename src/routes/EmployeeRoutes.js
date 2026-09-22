const router=require("express").Router()
const empController=require("../controllers/EmployyeController")
const authMiddleware = require("../middlewares/AuthMiddleware")


router.get("/emp/:name/:company",empController.getAllEmp)
router.get("/emp",authMiddleware,empController.getEmp)
router.get("/empbyid/:id",empController.EmpByID)
router.get("/searchemp",empController.searchEmp)

router.post("/createmp",empController.createEmp)
module.exports=router    


