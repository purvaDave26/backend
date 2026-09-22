const jwt=require("jsonwebtoken")
const secret="royal"
const userModel=require("../models/UserModel")

const authMiddleware=async(req,res,next)=>{
    //req.headers
      //eg: Bearer jbsakhasiumahsumhashsiuhissauiasnius
      var token=req.headers.authorization
      if(token){
        //check Bearer protocol
        if(token.startsWith("Bearer ")){
             //remove Bearer from 
            //Bearer jbsakhasiumahsumhashsiuhissauiasnius
            //[Bearer,asnsjamiojsjasilasjklsamnlkas]
            token=token.split(" ")[1]
            //now verify token with jwt
            try{
               const decoded= jwt.verify(token,secret)
               console.log("decoded object:",decoded)
               const verifiedUser=await userModel.findById(decoded.id)
               if(verifiedUser)
               {
                next();
               }
               else{
                res.status(401).json({
                    message:"not valid user"
                })
               }

                 //if token can not verify it will throw exception and go to catch block
                //if token can  verify will send to next
               // next() // it will go to controller
            }
            catch(err)
            {
                res.status(401).json({
                    message:"invalid token",
                    err:err
                })
            }
            
        }
        else{
                res.status(401).json({
                    message:"token is not bearer token"
                })
            }

      }
      else{
        res.status(401).json({
            message:"token is missing"
        })
      }
}
module.exports=authMiddleware