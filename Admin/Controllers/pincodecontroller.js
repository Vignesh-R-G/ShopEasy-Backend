const express=require('express')

const pincodeschema=require('../Models/pincodeschema')

exports.addPincode=async(req,res)=>{
    try{
        const pincode=await new pincodeschema({
            City:req.body.city,
            Pincode:req.body.pincode
        })
        await pincode.save()
        res.json({status:true,msg:"Pincode Added Successfully"})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in adding the new pincode"})
    }
}

exports.deletePincode=async(req,res)=>{
    try{
        const deletepincode=await pincodeschema.deleteOne({Pincode:req.params.pincode})
        res.json({status:true,msg:"Pincode Deleted successfully !"})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in deleting the pincode"})
    }
}

exports.getPincode=async(req,res)=>{
    try{
        const pincode=await pincodeschema.find()
        res.json({status:true,msg:pincode})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the pincode"})
    }
}

