const mongoose=require('mongoose')
const productschema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Price:{
        type:Number,
        required:true
    },
    Available_Qty:{
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
    Discount_Available:{
        type:Boolean,
        default:false
    },
    Discount:{
        type:Number,
        default:0
    },
    Description:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("productschema",productschema)