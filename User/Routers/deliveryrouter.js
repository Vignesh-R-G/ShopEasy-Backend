const express=require('express')
const router=express.Router()
const deliverycontroller=require('../Controllers/deliverycontroller')

router.route("/deliverydetails").post(deliverycontroller.deliverydetails)
router.route("/updatestatus").put(deliverycontroller.updateStatus)

module.exports=router