import { transporter } from "./Email.config.js";
import { Verification_Email_Template } from "./EmailTemplate.js";

export const sendVerificationCode=async(mail,verificationCode)=>{
    try{
        const res = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <sahithch5@gmail.com>', // sender address
            to:mail, // list of receivers
            subject: "Verify Email", // Subject line
            text: "Verify Email", // plain text body
            html: Verification_Email_Template.replace('{verificationCode}',verificationCode), // html body
          });
          console.log("res",res)
        }catch(e){
            console.log(e)
        };
        
}