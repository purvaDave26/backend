const { data } = require("../../employees")
const userModel=require("../models/UserModel")
const mailsend=require("../utils/MailUtils")
const uploadtoCloud=require("../utils/CloudinaryUpload")
const xlsx=require("xlsx")

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



//============for single file upload========================
// const createUser=async(req,res)=>
// {
//     try{

//         console.log("req file.....",req.file)
//         //const saveduser=await userModel.insertOne(req.body)
//         // const saveduser=await userModel.insertOne({...req.body,profilepicUrl:req.file.path})
//         // const mail=await mailsend(req.body.email,"create user","hello user")

//         //cloud
//        const cloudinaryresponse=await uploadtoCloud(req.file.path)
//        console.log("cloudinaryre response",cloudinaryresponse)

//        const saveduser=await userModel.insertOne({...req.body,profilepicUrl:cloudinaryresponse.secure_url})
//         res.json({
//             message:"user created",
//             data:saveduser
//         })
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.json({err:err})
//     }
// }

//===============for multiple file upload====================
const createUser=async(req,res)=>
{
    try{

        console.log("req file.....",req.files)
        
        const u=await Promise.all(req.files.map((file)=>uploadtoCloud(file.path)),);


        const urls=u.map((url)=>url.secure_url)
        console.log("urls...",urls)
        // const saveduser=await userModel.insertOne({...req.body,profilepicUrl:multifile[0],profileThumnails:multifile.slice(1,4)})    
        const saveduser=await userModel.insertOne({...req.body,profileThumnails:urls})    

        res.json({
            message:"user created",
            data:saveduser
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({err:err})
    }
}

const deleteUser=async(req,res)=>
{
    try{
        const id=req.params.id;
        const deletedUser=await userModel.findByIdAndDelete(id)
        if(deletedUser)
        {
            res.status(200).json({
                message:"user deleted",
                data:deletedUser
            })
        }
        else{
            res.status(400).json({
                message:"user not found to delete"
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:"error while deleting user",
            err:err
        })
    }
}

const updateUSer=async(req,res)=>
{
    try{

        const id=req.params.id;
        const updatedUSer=await userModel.findByIdAndUpdate(id,req.body,{new:true})
        if(updatedUSer)
        {
            res.status(400).json({
                 message:"user updated",
                data:updatedUSeredUser
            })
        }
        else
        {
            res.status(400).json({
                message:"user not found to update",
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:"error while updating user",
            err:err
        })
    }
}
const updateByAge=async(req,res)=>
{
    try{
        const age=req.params.age;
        const updatedage=await userModel.updateMany({age:{$gte:age}},req.body,{new:true});
        if(updatedage)
        {
             res.status(400).json({
                 message:"user updated",
                data:updatedage
            })
        }
        else{
            res.status(400).json({
                message:"user not found to update",
            })
        }
        
    }
    catch(err)
    {
        res.status(500).json({
            message:"error while updating age",
            err:err
        })
    }
}

const updateData=async(req,res)=>
{
    try{
        const id=req.query.id;
        const updateData=await userModel.findByIdAndUpdate(id,req.query,{new:true})
        if(id){
        if(updateData)
        {
            res.status(400).json({
                 message:"user updated",
                data:updateData
            })
        }
        else
        {
             res.status(400).json({
                message:"user not found to update",
            })
        }
    }
    else{
        res.status(404).json({
            message:"id not found"
        })
    }
    }
    catch(err)
    {
        req.status(500).json({
            message:"error while updating data",
            err:err
        })
    }
}

const createMultipuleusers=async(req,res)=>
{
    try {

    const workbook = xlsx.readFile(req.file.path);

    const worksheet =  workbook.Sheets[workbook.SheetNames[0]];

    const data= xlsx.utils.sheet_to_json(worksheet);


    const user=await userModel.insertMany(data)
        console.log(user);
        res.json({message:"ok"})
        
    } catch (error) {
        console.log(error)
        res.json({error:error})
        
    }
}

module.exports={
    getAllUsers,getUserById,searchUser,createUser,deleteUser,updateUSer,updateByAge,updateData,
    createMultipuleusers
}