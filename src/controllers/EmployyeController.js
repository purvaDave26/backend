const empModel=require("../models/EmpModel")
const getAllEmp=(req,res)=>
{
   
    console.log("params...",req.params)
    console.log(req.params.name)
    console.log(req.params.company)
    res.json({message:`${req.params.name} from ${req.params.company}` })
}
const getEmp=async(req,res)=>
{
    const emp=await empModel.find()
    res.json({message:"get  employees",data:emp})
}
module.exports={
    getAllEmp,getEmp
}