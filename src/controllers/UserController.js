const getAllUsers=(req,res)=>
{
    res.json({message:"get all users..."})
}
const getUserById=(req,res)=>
{
    console.log("params...",req.params)
    console.log(req.params.id)
    res.json({message:"get user by id called....",id:req.params.id})
}

module.exports={
    getAllUsers,getUserById
}