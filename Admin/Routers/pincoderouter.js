const express=require('express')
const router=express.Router()

const pincodecontroller=require('../Controllers/pincodecontroller')

router.route('/addpincode').post(pincodecontroller.addPincode)
router.route('/getpincode').get(pincodecontroller.getPincode)
router.route('/deletepincode/:pincode').delete(pincodecontroller.deletePincode)

module.exports=router