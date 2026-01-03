import rateLimit from "../config/upstash.js"

const rateLimiter = async (_, res , next)=>{
   
    try{
      const {success} = await rateLimit.limit("my_limit")
      if(!success) return res.status(429).json({message:"too many requests please try again later"})
    
     next()
    }catch(e){
     console.log("Rate limit error"+e)
     next(e)
    }
  
 
}

export default rateLimiter