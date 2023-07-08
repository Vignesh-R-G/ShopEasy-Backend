const express=require('express')

const historyschema=require('../Models/historyschema')
const deliveryschema=require('../Models/deliveryschema')
const orderschema=require('../Models/orderschema')

//To get the history of orders made by the user
exports.getOrdersOfUser=async(req,res)=>{
    try{
        const orders = await orderschema.find({OrderId:req.params.id}).sort({Date:-1})
        const lst = []
        let totalPrice =0
        for (const order of orders) {
            const delivery = await deliveryschema.findOne({OrderId:req.params.id}).sort({Date:-1})
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
        lst.push(totalPrice)
        console.log(lst)
        res.json({ status: true, msg: lst })
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the orders"})
    }
}

// To get the all the orderid in the history of a particular user
exports.getOrderIdInHistory=async(req,res)=>{
    try{
        const allorders=await historyschema.find({Email:req.params.email})
        res.json({status:true,msg:allorders})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getting the orderid in the history"})
    }
}


//To clear a particular history
exports.deleteParticularHistory=async(req,res)=>{
    try{
        const deletehistory=await historyschema.deleteOne({Order_Id:req.params.orderid})
        res.json({status:true,msg:deletehistory})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in deleting the particular history of the user"})
    }
}

//To clear Entiry History of Bookings made by the user
exports.deleteEntireHistory=async(req,res)=>{
    try{
        const deletehistory=await historyschema.deleteMany({Email:req.params.email})
        res.json({status:true,msg:deletehistory})
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:"Error occured in deleting the entire history of the user"})
    }
}