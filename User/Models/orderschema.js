const mongoose=require('mongoose')

const orderschema=mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    OrderId:{
        type:String,
        required:true
    },
    ProductId:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    Qty:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    }
})

module.exports=mongoose.model("orderschema",orderschema)