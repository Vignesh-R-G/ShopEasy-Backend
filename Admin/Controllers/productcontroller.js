const express=require('express')
const mongoose=require('mongoose')
const productschema=require('../Models/productschema')

// Add New Product
exports.addproduct=async (req,res)=>{
    try{
        const newproduct=await new productschema({
            Name:req.body.name,
            Price:req.body.price,
            Image:req.body.image,
            Available_Qty:req.body.qty,
            Category:req.body.category,
            Discount_Available:req.body.discount_available,
            Discount:req.body.discount,
            Description:req.body.description
        })
        await newproduct.save()
        res.json({status:true,msg:newproduct})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Adding the Product"})
    }
}

// Edit Quantity
exports.editquantity=async(req,res)=>{
    try{
        const edited=await productschema.updateOne({_id:req.body.id},{$set:{Available_Qty:req.body.qty}})
        res.json({status:true,msg:edited})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in editing the product"})
    }
}

// Auto Edit
exports.autoedit=async(req,res)=>{
    try{
        const product=await productschema.findOne({_id:req.body.id})
        const available=product.Available_Qty
        if(req.body.ordered_qty>available){
            res.json({status:false,msg:"Please reduce the quantity, Order failed"})
        }
        else{
            const edited=await productschema.updateOne({_id:req.body.id},{$set:{Available_Qty:available-req.body.ordered_qty}})
            res.json({status:true,msg:edited})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in auto editing"})
    }
}

// Delete Product
exports.deleteproduct=async(req,res)=>{
    try{
        const deleted=await productschema.deleteOne({_id:req.params._id})
        res.json({status:true,msg:deleted})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in deleting the product"})
    }
}

// Get All Products
exports.getAllProducts=async(req,res)=>{
    try{
        const products=await productschema.find()
        res.json({status:true,msg:products})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the products"})
    }
}

//Get Products By Category
exports.getByCategory=async(req,res)=>{
    try{
        const products=await productschema.find({Category:req.params.category})
        res.json({status:true,msg:products})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in filtering the products"})
    }
}

