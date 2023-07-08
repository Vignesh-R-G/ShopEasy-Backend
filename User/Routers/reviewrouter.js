const express=require('express')
const router=express.Router()

const reviewcontroller=require('../Controllers/reviewcontroller')

router.route('/addreview').post(reviewcontroller.addReview)
router.route('/deletereview/:reviewid').delete(reviewcontroller.deleteReview)
router.route('/getreviews/:productid').get(reviewcontroller.getReviews)

module.exports=router