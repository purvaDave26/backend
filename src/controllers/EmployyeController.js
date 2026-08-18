const getAllEmp=(req,res)=>
{
    console.log("params...",req.params)
    console.log(req.params.name)
    console.log(req.params.company)
    res.json({message:`${req.params.name} from ${req.params.company}` })
}

module.exports={
    getAllEmp
}