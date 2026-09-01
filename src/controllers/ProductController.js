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

const updateStockStatus=async(req,res)=>
{
    try{
        const update2=await ProductModel.updateMany({stock:{$gte:10}},{$set:{stockStatus:"available"}})
        const update3=await ProductModel.updateMany({stock:{$lt:10}},{$set:{stockStatus:"low"}})
        const update1=await ProductModel.updateMany({stock:0},{$set:{stockStatus:"out of stock"}})
       
        res.status(200).json({
            message:"stock updated",
            
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:"error while updateing stock",
            err:err
        })
    }
}
module.exports={
    createProduct,getAllProducts,updateStockStatus
}