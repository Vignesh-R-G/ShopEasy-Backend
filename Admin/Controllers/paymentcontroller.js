const express=require('express')
const paymentschema=require('../Models/paymentschema')

//Razorpay Payment Details

exports.addPaymentDetail=async(req,res)=>{
    try{
        const payment=await new paymentschema({
            PaymentId:req.body.paymentid,
            OrderId:req.body.orderid,
            Amount:req.body.amount
        })
        await payment.save()
        res.json({status:true,msg:"Payment Processed Successfully"})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in addnig the payment details"})
    }
}

exports.getPaymentDetail=async(req,res)=>{
    try{
        const payment=await paymentschema.findOne({OrderId:req.params.orderid})
        res.json({status:true,msg:payment})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in getting the payment details"})
    }
}