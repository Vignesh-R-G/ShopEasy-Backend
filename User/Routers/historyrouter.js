const express=require('express')
const router=express.Router()
const historycontroller=require('../Controllers/historycontroller')

router.route("/getordersofuser/:id").get(historycontroller.getOrdersOfUser)
router.route("/getorderidinhistory/:email").get(historycontroller.getOrderIdInHistory)
router.route("/deleteparticularhistory/:orderid").delete(historycontroller.deleteParticularHistory)
router.route("/deleteentirehistory/:email").delete(historycontroller.deleteEntireHistory)

module.exports=router