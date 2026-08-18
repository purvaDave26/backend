const express=require("express")//express module name
//create an object of express
const app=express()

//require


const userRoutes=require("./src/routes/UserRoutes")
app.use("/user",userRoutes) 

const empRoutes=require("./src/routes/EmployeeRoutes")
app.use("/emp",empRoutes)

const PORT=3000 
//server creation
app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`)
})