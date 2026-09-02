const mailer=require("nodemailer")
require("dotenv").config()

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
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        html:"<h1>hello user</h1>",
        attachments: [
            {
                filename: "images1.jpg",
                 path: "./src/utils/images1.jpg"
            }
        ]
    }
    const mailresponse=await transport.sendMail(mailOptions)
    console.log(mailresponse)
}
//mailsend("purvadave885@gmail.com","test mail","welcome...")
module.exports=mailsend