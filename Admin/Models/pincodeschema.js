const mongoose=require('mongoose')

const pincodeschema=mongoose.Schema({
    City:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("pincodeschema",pincodeschema)