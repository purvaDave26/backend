const zodmiddleware=(schma)=>(req,res,next)=>{
    //schema==uservalidation
    try{
        schma.parse(req.body)
        next()
    }
    catch(err)
    {
        res.status(400).json({
            message:"invalid request",
            err:err
        })
    }
}
module.exports=zodmiddleware