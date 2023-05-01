const express=require('express')
const mongoose=require('mongoose')
const orderschema=require('../Models/orderschema')
const deliveryschema=require('../Models/deliveryschema')
const orderidschema=require('../Models/orderidschema')
const productschema=require('../../Admin/Models/productschema')

//Place Order
exports.placeOrder=async(req,res)=>{
    try{
        const lst=await req.body
        const idGenerator=await new orderidschema({
            Email:lst[0].email
        })
        await idGenerator.save()
        const orderid=await idGenerator._id
        lst.map(async(x)=>{
            const neworder=await new orderschema({
                Email:x.email,
                ProductId:x.productid,
                ProductName:x.productname,
                Qty:x.qty,
                Price:x.price,
                OrderId:orderid,
                Image:x.image,
                Category:x.category
            })
            await neworder.save()
        })
        res.json({status:true,msg:"Order Placed successfully"})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Placing the order"})
    }
}

//Getting the Orders
exports.getOrders=async(req,res)=>{
    try{
        const orders = await orderschema.find()
        const lst = []

        for (const order of orders) {
        const delivery = await deliveryschema.findOne({
            $and: [{ OrderId: order.OrderId }, { $or: [{ Status: "Not Viewed" }, { Status: "In Progress" }] }]
        })

        if (delivery) {
            const obj = {
                _id: order._id,
                Email: order.Email,
                OrderId: order.OrderId,
                ProductId: order.ProductId,
                ProductName: order.ProductName,
                Qty: order.Qty,
                Price: order.Price,
                Image: order.Image,
                Category: order.Category,
                Pincode: delivery.Pincode,
                Address: delivery.Address,
                Name: delivery.Name,
                OrderedDate: delivery.OrderedDate,
                Status:delivery.Status
            };

            lst.push(obj);
            console.log(lst);
        }
        }

        res.json({ status: true, msg: lst })
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the orders"})
    }
}

//check quantity available
exports.checkqty=async(req,res)=>{
    try{
        const product=await productschema.findOne({_id:req.body.id})
        if(product.Available_Qty>=req.body.qty){
            res.json({status:true,msg:true})
        }
        else{
            res.json({status:true,msg:false})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in checking the quantity"})
    }
}





