import nodemailer from "nodemailer"
import path from "path"
import handlebars from "handlebars"
import fs from "fs"
import { fileURLToPath } from "url"


const _filename=fileURLToPath(import.meta.url)
const _dirname=path.dirname(_filename)

export const verifyEmail=async(token,email)=>{

    const emailTemplate=fs.readFileSync(
        path.join(_dirname,"template.hbs"),
        "utf-8"
    )
    const template=handlebars.compile(emailTemplate)
    const htmlToSend=template({token:encodeURIComponent(token)})

    const transporter =nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailConfigurations={
        from:process.env.MAIL_USER,
        to:email,
        subject:"Email Verification",
        html:htmlToSend,
    }


    transporter.sendMail(mailConfigurations,function(error,info){
        if(error){
            throw new Error(error)
        }
         console.log("Email Send Successfully")
   
    })
   
    

}