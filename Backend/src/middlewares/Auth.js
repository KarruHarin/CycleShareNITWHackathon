export const generatetoken=(user)=>{
    const payload = {username:user.username}
       return jwt.sign(payload,ACCESS_TOKEN,{expiresIn:'1h'})
    }
  export  const Authorization = (req,res,next)=>{
    
        const authheader = req.headers.auth;
    
    if(authheader){
        
        const token = authheader.split(' ')[1]
    jwt.verify(token,ACCESS_TOKEN,(err,user)=>{
    if(err){
        res.sendStatus(403)
    }
    else{
        req.user = user
        next();
    
    }})
    
    }
    else{
        res.json({message:"user not found"})
    }
    }
    