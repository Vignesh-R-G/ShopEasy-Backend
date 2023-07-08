const express=require('express')
const router=express.Router()
const ordercontroller=require('../Controllers/ordercontroller')

router.route("/placeorder").post(ordercontroller.placeOrder)
router.route("/getorders/:id").get(ordercontroller.getOrders)
router.route("/getdeliveredorders/:id").get(ordercontroller.getDeliveredOrders)
router.route("/checkqty").post(ordercontroller.checkqty)
router.route("/distinctorders").get(ordercontroller.distinctorders)
router.route("/cancelorder/:orderid").delete(ordercontroller.cancelOrder)
router.route("/distinctordersbasedondate/:date").get(ordercontroller.distinctOrdersBasedOnDate)


module.exports=router