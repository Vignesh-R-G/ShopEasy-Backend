const mongoose=require('mongoose')
const deliveryschema=mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Address:{
        type:String,
        required:true,
        trim:true
    },
    Pincode:{
        type:String,
        required:true,
        trim:true
    },
    MobileNumber:{
        type:Number,
        required:true
    },
    OrderId:{
        type:String,
        required:true,
        trim:true
    },
    OrderedDate:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    },
    Status:{
        type:String,
        default:"Not Viewed"
    }
})

module.exports=mongoose.model("deliveryschema",deliveryschema)