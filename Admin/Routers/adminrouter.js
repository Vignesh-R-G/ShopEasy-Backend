const express=require('express')
const router=express.Router()
const admincontroller=require('../Controllers/admincontroller')

router.route("/register").post(admincontroller.register)
router.route("/login").post(admincontroller.login)
router.route("/verifytoken/:token").get(admincontroller.verifytoken)

module.exports=router