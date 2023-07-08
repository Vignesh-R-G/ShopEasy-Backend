const mongoose=require('mongoose')

const historyschema=mongoose.Schema({
    Email:{
        type:String,
        required:true,
        trim:true
    },
    Order_Id:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('historyschema',historyschema)