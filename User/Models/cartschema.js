const mongoose=require('mongoose')

const cartschema=mongoose.Schema({
    Email:{
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

module.exports=mongoose.model("cartschema",cartschema)