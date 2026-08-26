const express=require("express")//express module name
//create an object of express
const app=express()

const getDBConnection=require("./src/utils/DBConnection")
getDBConnection()

//glob middlelware
app.use(express.json())

//require


const userRoutes=require("./src/routes/UserRoutes")
app.use("/user",userRoutes) 

const empRoutes=require("./src/routes/EmployeeRoutes")
app.use("/emp",empRoutes)


const roleRoutes=require("./src/routes/RoleRoutes")
app.use("/role",roleRoutes)
const PORT=3000 
//server creation
app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`)
})