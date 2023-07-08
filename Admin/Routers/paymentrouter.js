const express=require('express')
const router=express.Router()

const paymentcontroller=require('../Controllers/paymentcontroller')
router.route("/addpaymentdetail").post(paymentcontroller.addPaymentDetail)
router.route("/getpaymentdetail/:orderid").get(paymentcontroller.getPaymentDetail)

module.exports=router