const categoryModel=require("../models/CategoryModel")
const createCategory=async(req,res)=>
{
   try{
     const savedcategory=await categoryModel.create(req.body)
    res.json({
        message:"category saved !!",
        data:savedcategory
    })
   }
   catch(err){
    console.log(err)
    res.json({
        message:"error while saving category",
        err:err
    })
   }
}

const getAllCategory=async(req,res)=>
{
    try{
        const categories=await categoryModel.find()
        if(categories.length>0){
            res.json({
                message:"category featched",
                data:categories
            })
        }
        else{
            res.json({
                message:"no category featched",
            })
        }
    }
    catch(err){
        res.json({
            message:"error while fatching category",
            err:err
        })
    }
}

module.exports={
    createCategory,getAllCategory
}