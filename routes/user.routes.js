const express = require('express')
const router   = express.Router()
const loginCheck = require("../app/middleware/auth.middleware")

const {isAdmin,isSeller,isCustomer}= require("../app/middleware/rbac.middleware")
const  UserController = require("../app/controllers/user.controller")
const user_obj = new UserController()

router.route('/')
// get all user
.get(loginCheck,isAdmin, user_obj.getAllUsers)




router.route("/:id")
// update user
.put(user_obj.updateUser)
// delete user by id
.delete(user_obj.deleteUserById)

// get all user
router.get("/", (req, res) => {
 res.json({
  result: [{
   id: 1,
   name: "Binit"
  },
  {
   id: 2,
   name: "aastha"
  },
  ],
  msg: "Success",
  status: true
 },

 )
})
// save user
router.post("/",(req,res)=>{
 res.json({
  result:1,
  msg:"user created successfully",
  status :false
 })

})
router.delete("/:id",(req,res)=>{
 res.json({
  result:req.params,
  msg:"User Delete successfully",
  status:true
 })
})
module.exports = router;
