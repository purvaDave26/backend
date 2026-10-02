const express=require("express")//express module name
//create an object of express
const app=express()
const cors=require("cors")
app.use(cors())
const Redis=require("ioredis")
const {Queue}=require("bullmq")
const getDBConnection=require("./src/utils/DBConnection")
const mailsend = require("./src/utils/MailUtils");
const { hashSync } = require("bcrypt")
const bcrypt = require("bcrypt")
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

app.post("/send-otp",async(req,res)=>{
    const otp=Math.floor(1000 + Math.random() * 9000);
    await redisconnection.set(`otp:${req.body.email}`,otp.toString(),"EX",300)
    mailsend(req.body.email,"otp",otp.toString())

    res.json({
        message:"otp send",
        data:otp
    })
})



app.post("/verify-otp",async(req,res)=>{
    const email=req.body.email;
    const otp=req.body.otp;

    const savedotp=await redisconnection.get(`otp:${email}`)
    if(otp==savedotp)
    {
        res.json({
            message:"otp matched"
        })
    }
    else{
        res.json({
            message:"otp does not match"
        })
    }
})


app.post("/reset-password",async(req,res)=>{
    try {
        const email=req.body.email;
        const otp=req.body.otp;
        const newpassword=req.body.newpassword;

    const savedotp=await redisconnection.get(`otp:${email}`)
    if(otp==savedotp)
    {
        const foundUser=UserModel.findOne({email:req.body.email})
        const hashpassword=bcrypt.hashSync(newpassword,10)
        const updateUser=await UserModel.findByIdAndUpdate(foundUser._id,{password:hashpassword})

        res.json({
            message:"password updated"
        })
    }
    else{
        res.json({
            message:"user not updated"
        })
    }
    } catch (err) {
        console.log(err)
        res.json({err:err}) 
    }
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
const UserModel = require("./src/models/UserModel")


app.use("/book",bookRoutes)

const PORT=3000 
//server creation
app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`)
})