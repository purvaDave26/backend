const roleModel=require("../models/RoleModel")

const getAllRole=async(req,res)=>
{
    try{
        const allRole=await roleModel.find();
        res.json({message:"all role",data:allRole})
    }
    catch(err)
    {
        res.json({err:err})
    }
}

const createRole=async(req,res)=>
{
    try{
        const saveRole=await roleModel.insertOne(req.body);
        res.json({message:"role saved",data:saveRole})
    }
    catch(err)
    {
        res.json({err:err})
    }
}

module.exports={
    getAllRole,createRole
}