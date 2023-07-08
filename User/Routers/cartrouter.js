const express=require('express')
const router=express.Router()
const cartcontroller=require('../Controllers/cartcontroller')

router.route("/addtocart").post(cartcontroller.addtocart)
router.route("/removefromcart/:productid/:email").delete(cartcontroller.removeFromCart)
router.route("/viewcart/:email").get(cartcontroller.viewcart)
router.route("/modifyqty").put(cartcontroller.modifyqty)

module.exports=router