const mongoose=require('mongoose')

//schema for generating the same order id for bulk orders
const orderidschema=mongoose.Schema({
    Email:{
        type:String
    }
})

module.exports=mongoose.model("orderidschema",orderidschema)