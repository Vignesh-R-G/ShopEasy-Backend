const express=require('express')
const mongoose=require('mongoose')
const adminschema=require('../Models/adminschema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
require('dotenv/config')

//Admin Register
exports.register=async(req,res)=>{
    try{
        const isAdminExist=await adminschema.findOne({Email:req.body.email})
        if(isAdminExist){
            res.json({status:false,msg:"Admin Already Exist"})
        }
        else{
            const hashedpassword=await bcrypt.hash(req.body.password,10)
            const newadmin=await new adminschema({
                Name:req.body.name,
                Email:req.body.email,
                MobileNumber:req.body.mno,
                Age:req.body.age,
                Password:hashedpassword
            })
            await newadmin.save()
            res.json({status:true,msg:newadmin})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in adding the admin"})
    }
}

//Admin Login
exports.login=async(req,res)=>{
    try{
        const isAdminExist=await adminschema.findOne({Email:req.body.email})
        if(isAdminExist){
            const isPasswordMatched=await bcrypt.compare(req.body.password,isAdminExist.Password)
            if(isPasswordMatched){
                const token=jwt.sign({_id:isAdminExist._id},process.env.SECRET_KEY,{expiresIn:"1d"})
                res.json({status:true,msg:"Signed In Successfully !",token:token,name:isAdminExist.Name,email:isAdminExist.Email})
            }
            else{
                res.json({status:false,msg:"Password mismatched !"})
            }
        }
        else{
            res.json({status:false,msg:"Account does not exist !"})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Admin Login"})
    }
}

//Verify Token
exports.verifytoken=async (req,res)=>{
    try{
        const token=await req.params.token
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                res.json({status:false,msg:"Authentication Expired"})
            }
            else{
                const admin=await adminschema.find({_id:decoded._id})
                res.json({status:true,msg:"Login Successful !",name:admin.Name,email:admin.Email})
            }
        })
    }
    catch(err){
        res.json({status:false,msg:"Error occured in verification !"})
    }
}

