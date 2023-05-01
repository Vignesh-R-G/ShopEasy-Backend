const express=require('express')
const usercontroller=require('../Controllers/usercontroller')
const router=express.Router()

router.route("/register").post(usercontroller.signup)
router.route("/login").post(usercontroller.login)
router.route("/verifytoken/:token").get(usercontroller.verifytoken)

module.exports=router