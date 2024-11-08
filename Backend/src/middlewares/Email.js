const sendVerificationCode=async(mail,verificationCode)=>{
    try{
        const res = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <sahithch5@gmail.com>', // sender address
            to:mail, // list of receivers
            subject: "Verify Email", // Subject line
            text: "Verify Email", // plain text body
            html: verificationCode, // html body
          });
          console.log("res",res)
        }catch(e){
            console.log(e)
        };
        
}