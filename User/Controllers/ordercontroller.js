const express=require('express')
const mongoose=require('mongoose')

require('dotenv/config')


//Importing necessary schema
const orderschema=require('../Models/orderschema')
const deliveryschema=require('../Models/deliveryschema')
const orderidschema=require('../Models/orderidschema')
const productschema=require('../../Admin/Models/productschema')
const historyschema=require('../Models/historyschema')

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

        const newhistory=await new historyschema({
            Email:lst[0].email,
            Order_Id:orderid
        })
        await newhistory.save()

        res.json({status:true,msg:orderid})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in Placing the order"})
    }
}


//Getting the Not Viewed and Inprogress Orders By Id
exports.getOrders=async(req,res)=>{
    try{
        const orders = await orderschema.find({OrderId:req.params.id}).sort({Date:-1})
        const lst = []
        let totalPrice =0
        for (const order of orders) {
        const delivery = await deliveryschema.findOne({
            $and: [{ OrderId: order.OrderId }, { $or: [{ Status: "Not Viewed" }, { Status: "In Progress" }] }]
        })

        
        if (delivery) {
            totalPrice+=(order.Price*order.Qty)
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
                MobileNumber:delivery.MobileNumber,
                Status:delivery.Status
            };

            lst.push(obj);
            console.log(lst);
        }
        }
        lst.push(totalPrice)
        console.log(lst)
        res.json({ status: true, msg: lst })
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the orders"})
    }
}


//Getting the delivered orders
exports.getDeliveredOrders=async(req,res)=>{
    try{
        const orders = await orderschema.find({OrderId:req.params.id})
        const lst = []
        let totalPrice =0
        for (const order of orders) {
        const delivery = await deliveryschema.findOne({
            $and: [{ OrderId: order.OrderId }, {Status:"Delivered"}]
        })

        
        if (delivery) {
            totalPrice+=(order.Price*order.Qty)
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
                MobileNumber:delivery.MobileNumber,
                Status:delivery.Status
            };

            lst.push(obj);
            console.log(lst);
        }
        }
        lst.push(totalPrice)
        console.log(lst)
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

//distict orders as per id
exports.distinctorders=async(req,res)=>{
    try{
        const orders=await orderschema.distinct("OrderId")
        res.json({status:true,msg:orders})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in distinct orders"})
    }
}

//To cancel the order made by the user
exports.cancelOrder=async(req,res)=>{
    try{
        const deleteorder=await orderschema.deleteMany({OrderId:req.params.orderid})
        const deletehistory=await historyschema.deleteOne({Order_Id:req.params.orderid})
        const deleteorderid=await orderidschema.deleteOne({_id:req.params.orderid})
        res.json({status:true,msg:"Order Cancelled successfully !"})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in cancelling the order"})
    }
}


//To get all the distinct order id's based on date
exports.distinctOrdersBasedOnDate=async(req,res)=>{
    try{
        const orders=await orderschema.find({Date:req.params.date}).distinct("OrderId")
        res.json({status:true,msg:orders})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in distinct orders"})
    }
}

