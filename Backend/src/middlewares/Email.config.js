import nodemailer from "nodemailer"
import { User } from "../models/user.model";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "sahithch5@gmail.com",
      pass: "mmbv dohg cbzj plgx",
    },
  });

  const SendEmail=async(mail)=>{
   try{
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <sahithch5@gmail.com>', // sender address
        to:mail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    }catch(e){
        console.log(e)
    };
    
  }
  SendEmail()