const mongoose=require("mongoose")

const getDBConnection=()=>
{
    mongoose.connect("mongodb://127.0.0.1:27017/purvanode").then(()=>{
        console.log("database connection")
    }).catch((err)=>
    {
         console.log("error while connection database...",err)   
    })
}
module.exports=getDBConnection