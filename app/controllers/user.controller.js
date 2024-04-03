class UserController{
  
 getAllUsers=  (req,res,next)=>{
  res.json({
   result:[],
   msg:"Fetched all users",
   status:true
  })
 }
 updateUser=(req,res,next)=>{
  
 }

 deleteUserById =(req,res,next)=>{
  
 }
}

module.exports =UserController