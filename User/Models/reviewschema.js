const mongoose=require('mongoose')
const reviewschema=mongoose.Schema({
    ProductId:{
        type:String,
        required:true
    },
    UserEmail:{
        type:String,
        trim:true,
        required:true
    },
    UserName:{
        type:String,
        trim:true,
        required:true
    },
    Review:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    }
})
module.exports=mongoose.model("reviewschema",reviewschema)