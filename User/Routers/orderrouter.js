const express=require('express')
const router=express.Router()
const ordercontroller=require('../Controllers/ordercontroller')

router.route("/placeorder").post(ordercontroller.placeOrder)
router.route("/getorders").get(ordercontroller.getOrders)
router.route("/checkqty").post(ordercontroller.checkqty)

module.exports=router