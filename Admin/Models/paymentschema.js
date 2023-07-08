const mongoose=require('mongoose')

const paymentschema=mongoose.Schema({
    PaymentId:{
        type:String,
        required:true
    },
    OrderId:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("paymentschema",paymentschema)