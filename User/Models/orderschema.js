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
    }
})

module.exports=mongoose.model("orderschema",orderschema)