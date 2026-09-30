const mailer=require("nodemailer")
const path=require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mailsend=async(to,subject,text)=>
{
    const transport=mailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    const mailOptions={
        from:"purvaroyal@gmail.com",
        to:to,
        subject:subject,
        text:text,
        // html:"<h1>hello user</h1>",
        // attachments: [
        //     {
        //         filename: "images1.jpg",
        //          path: "./src/utils/images1.jpg"
        //     }
        // ]
    }
    try {
         const mailresponse=await transport.sendMail(mailOptions)
    console.log(mailresponse)
    } catch (error) {
        console.log(error)
    }
   
}
//mailsend("purvadave885@gmail.com","test mail","welcome...")
module.exports=mailsend