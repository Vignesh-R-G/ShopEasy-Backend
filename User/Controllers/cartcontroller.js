const express=require('express')
const mongoose=require('mongoose')
const cartschema=require('../Models/cartschema')

//Add Products to Cart
exports.addtocart=async(req,res)=>{
    try{
        const isItemExist=await cartschema.findOne({ProductId:req.body.productid})
        if(isItemExist)
            res.json({status:false,msg:"Item already exist in your cart"})
        else{
            const addproduct=await new cartschema({
                Email:req.body.email,
                ProductId:req.body.productid,
                ProductName:req.body.productname,
                Image:req.body.image,
                Price:req.body.price,
                Category:req.body.category,
                Qty:req.body.qty
            })
            await addproduct.save()
            res.json({status:true,msg:addproduct})
        }
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in add to cart"})
    }
}

//Remove Products From Cart
exports.removeFromCart=async(req,res)=>{
    try{
        const removeproduct=await cartschema.deleteOne({$and:[{ProductId:req.params.productid},{Email:req.params.email}]})
        res.json({status:true,msg:removeproduct})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in remove from cart"})
    }
}

//to view the cart
exports.viewcart=async(req,res)=>{
    try{
        const cart=await cartschema.find({Email:req.params.email})
        res.json({status:true,msg:cart})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in view cart"})
    }
}

// to modify quanity in cart
exports.modifyqty=async(req,res)=>{
    try{
        const cart=await cartschema.updateOne({$and:[{Email:req.body.email},{ProductId:req.body.id}]},{$set:{Qty:req.body.qty}})
        res.json({status:true,msg:cart})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in updating the cart"})
    }
}

