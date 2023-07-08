const express=require('express')
const reviewschema=require('../Models/reviewschema')

exports.addReview=async(req,res)=>{
    try{
        const review=await new reviewschema({
            ProductId:req.body.productid,
            UserName:req.body.username,
            Review:req.body.userreview,
            UserEmail:req.body.useremail
        })
        await review.save()
        res.json({status:true,msg:"Review Added Successfully"})
    }
    catch(err){
        console.log(err)
        res.json({ststus:false,msg:"Error occured in adding the review"})
    }
}

exports.deleteReview=async(req,res)=>{
    try{
        const review=await reviewschema.deleteOne({_id:req.params.reviewid})
        res.json({status:true,msg:"Review deleted successfully"})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in deleting the review"})
    }
}

exports.getReviews=async(req,res)=>{
    try{
        const reviews=await reviewschema.find({ProductId:req.params.productid})
        res.json({status:true,msg:reviews})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the reviews"})
    }
}