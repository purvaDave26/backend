const { data } = require("../../employees")
const userModel=require("../models/UserModel")

const getAllUsers=async(req,res)=>
{
    const users=await userModel.find()
    res.json({message:"get all users...",data:users})
}
const getUserById=async(req,res)=>
{
   const id=req.params.id;
   //const foundUser=await userModel.find({_id:id}) //return array 
   // const foundUser=await userModel.findOne({_id:id}) //return json 
   const foundUser=await userModel.findById(id) //return array 
   if(foundUser)
   {
    res.json({
        message:"user found",
        data:foundUser
    })
   }
   else
   {
    res.json({
        message:"user not found",
    })
   }

}

const searchUser=async(req,res)=>{
    const data=req.query;
    console.log(data)
    res.json({data:data})
}


// const createUser=async(req,res)=>
// {
//     //req.params :id
//     //req.query  :?&
//     //req.body   :POST,PUT,DELETE
//     console.log("req body",req.body)
//     //db.users.insertOne(req.body)
//     //userModel.insertOne(req.body)
//     const savedUser=await userModel.insertOne(req.body)
//     res.json({message:"user created",data:savedUser})

// }

const createUser=async(req,res)=>
{
    try{
        const saveduser=await userModel.insertOne(req.body)
        res.json({
            message:"user created",
            data:saveduser
        })
    }
    catch(err)
    {
        res.json({err:err})
    }
}


module.exports={
    getAllUsers,getUserById,searchUser,createUser
}