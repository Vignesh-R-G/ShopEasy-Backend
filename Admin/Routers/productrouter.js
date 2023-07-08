const express=require('express')
const router=express.Router()
const productcontroller=require('../Controllers/productcontroller')

router.route("/addproduct").post(productcontroller.addproduct)
router.route("/editproduct").put(productcontroller.editproduct)
router.route("/autoedit").put(productcontroller.autoedit)
router.route("/autoeditwhencancelling").put(productcontroller.autoEditWhenCancelling)
router.route("/deleteproduct/:_id").delete(productcontroller.deleteproduct)
router.route("/getallproducts").get(productcontroller.getAllProducts)
router.route("/getbycategory/:category").get(productcontroller.getByCategory)

module.exports=router
