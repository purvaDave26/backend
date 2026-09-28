const express=require("express")//express module name
//create an object of express
const app=express()
const Redis=require("ioredis")
const {Queue}=require("bullmq")
const getDBConnection=require("./src/utils/DBConnection")
getDBConnection()

//glob middlelware
app.use(express.json())

//require
const redisconnection=new Redis(
    "redis://default:SANFcc9pBcyxNMTTS4GTxEsXjTk4sYa8@dewy-lace-farm-99384.db.redis.io:15561"
);
redisconnection.on("connect",()=>
{
    console.log("redis connected")
})

const myQueue=new Queue("taskQueue",{connection:redisconnection})


app.post("/add-task",async(req,res)=>{
    console.log("addig task to queue...")
    const name=req.body.name
    const email=req.body.email
    await myQueue.add("task",{name,email},{delay:0})
    res.json({
        message:"task has been assigend"
    })
})




//localhost
const userRoutes=require("./src/routes/UserRoutes")
app.use("/user",userRoutes) 

const empRoutes=require("./src/routes/EmployeeRoutes")
app.use("/emp",empRoutes)


const roleRoutes=require("./src/routes/RoleRoutes")
app.use("/role",roleRoutes)

const categoryRoutes=require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)


const productRoutes=require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)


const bookRoutes=require("./src/routes/BookRoutes")
app.use("/book",bookRoutes)

const PORT=3000 
//server creation
app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`)
})