import jwt from "jsonwebtoken";

const productAuthication =(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message :"Unauthorized, jwt Token is require"})
    }
    try{
        const decode=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch(error)
    {
      return res.status(403).json({message:"Unauthorized, jwt Token wrong and expired"})   
    }
}

export default productAuthication;