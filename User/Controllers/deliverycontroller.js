const express=require('express')
const mongoose=require('mongoose')
const deliveryschema=require('../Models/deliveryschema')
const orderschema=require('../Models/orderschema')

exports.deliverydetails=async(req,res)=>{
    try{
        
        const delivery=await new deliveryschema({
            Email:req.body.email,
            Name:req.body.name,
            Address:req.body.address,
            Pincode:req.body.pincode,
            OrderId:req.body.orderid,
            MobileNumber:req.body.mno
        })
        await delivery.save()
        res.json({status:true,msg:delivery})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in delivery details module"})
    }
}

//Updating the status
exports.updateStatus=async(req,res)=>{
    try{
        const updated=await deliveryschema.updateOne({OrderId:req.body.orderid},{$set:{Status:req.body.orderstatus}})
        res.json({status:true,msg:updated})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in updating the status"})
    }
}