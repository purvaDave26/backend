const testmiddleware =(role)=>(req,res,next)=>{
    console.log("role param",role);
    console.log("test middleware called...");
    if(role=="ADMIN")
    {
        next();
    }
    else
    {
        res.status(400).json({
            message:"invalid request"
        })
    }
}
module.exports=testmiddleware