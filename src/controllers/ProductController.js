const ProductModel=require("../models/ProductModel")
const createProduct=async(req,res)=>
{
    try{
        const savedproduct=await ProductModel.create(req.body)
        res.status(201).json({
            message:"product created",
            data:savedproduct
        })
    }catch(err){
        res.json({
            message:"error while creating product",
            err:err
        })
    }
}

const getAllProducts=async(req,res)=>
{
    try{
        const product=await ProductModel.find().populate("categoryId")
        if(product.length>0)
        {
            res.json({
                message:"product fetched",
                data:product
            })
        }
        else{
            res.json({
                message:"product not found"
            })
        }
    }
    catch(err)
    {
        res.json({
            message:"error while fetching product",
            err:err
        })
    }
}
module.exports={
    createProduct,getAllProducts
}