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
    OrderId:{
        type:String,
        required:true,
        trim:true
    },
    OrderedDate:{
        type:Date,
        default:Date.now()
    },
    Status:{
        type:String,
        default:"Not Viewed"
    }
})

module.exports=mongoose.model("deliveryschema",deliveryschema)