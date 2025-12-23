import nodemailer from "nodemailer"
import path from "path"
import handlebars from "handlebars"
import fs from "fs"
import { fileURLToPath } from "url"




const _filename=fileURLToPath(import.meta.url)
const _dirname=path.dirname(_filename)

export const sendOtpMail=async(email,otp)=>{

        const emailTemplate=fs.readFileSync(
            path.join(_dirname,"sendOtp.hbs"),
            "utf-8"
        )
        const template=handlebars.compile(emailTemplate)
        const htmlToSend=template({otp:encodeURIComponent(otp)})

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailOption={
        from:process.env.MAIL_USER,
        to:email,
        subject:'Password Reset OTP',
        html:htmlToSend
    }

    await transporter.sendMail(mailOption)
}