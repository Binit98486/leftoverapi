const router =  require("express").Router()
const AuthController  = require("../app/controllers/auth.controller")
const auth_ctrl = new AuthController()

 const uploader= require('../app/middleware/file-upload.middleware')
const setDestination=(req,res,next)=>{
 req.dest="/users";
 next()
} 
const setProductFileDestination=(req,res,next)=>{
 req.dest ="/product";
 next()
}
// aauta matra file xa vane single ,if multiple xa vane single and  ("image") vaneko key ho jun ma file upload hunxa i.e imageFile,thumbnailfile
router.post("/register",setDestination,uploader.array("image"), auth_ctrl.register)

router.post("/login", auth_ctrl.login)

router.post('product/:id',setProductFileDestination,uploader.array("images"))

module.exports = router;
