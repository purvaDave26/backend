const EmpModel = require("../models/EmpModel")
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

const EmpByID=async(req,res)=>
{
   const id=req.params.id;

    const findEmp=await empModel.findById(id)
    if(findEmp){
        res.json({
            message:"emp found",
            data:findEmp
        })
    }
    else
    {
        res.json({
            message:"not found"
        })
    }
}
const searchEmp=async(req,res)=>
{
    const data=req.query;
    console.log(data)
    res.json({data:data})
}

const createEmp=async(req,res)=>
{
    const savedEmp=await EmpModel.insertOne(req.body)
    res.json({message:"employee saved",data:savedEmp})
}
module.exports={
    getAllEmp,getEmp,EmpByID,searchEmp,createEmp
}