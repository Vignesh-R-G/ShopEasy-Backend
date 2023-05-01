const express=require('express')
const mongoose=require('mongoose')
const userschema=require('../Models/userschema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
require('dotenv/config')

exports.signup=async(req,res)=>{
    try{
        const emailcheck=await userschema.findOne({Email:req.body.email})
        if(emailcheck){
            res.json({status:false,msg:"Email Already Exist !"})
        }
        else{
            const hashedpassword=await bcrypt.hash(req.body.password,10)
            const newuser=await new userschema({
                Name:req.body.name,
                Email:req.body.email,
                Age:req.body.age,
                MobileNumber:req.body.mno,
                Password:hashedpassword
            })
            await newuser.save()
            res.json({status:true,msg:"Account created successfully !"})
        }   
    }
    catch(err){
        res.json({status:false,msg:"Error Occured in signup"})
    }
}

exports.login=async(req,res)=>{
        const user=await userschema.findOne({Email:req.body.email})
        if(user){
            const checkpassword=await bcrypt.compare(req.body.password,user.Password)
            if(checkpassword){
                const token=await jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
                res.json({status:true,msg:"Signed in successfully !",token:token,name:user.Name,email:user.Email})
            }
            else{
                res.json({status:false,msg:"Invalid password"})
            }
        }
        else{
            res.json({status:false,msg:"User not found!"})
        }
    
}

exports.verifytoken=async(req,res)=>{
    const token=await req.params.token
    try{
        const tokenverify=await jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                res.json({status:false,msg:"Authentication Expired"})
            }
            else{
                const user=await userschema.findById({_id:decoded._id})
                res.json({status:true,msg:"Login successful !",name:user.Name,email:user.Email})
            }
        })
    }
    catch(err){
        res.json({status:false})
    }

}