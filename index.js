const express=require('express')
const mongoose=require('mongoose')
const productrouter=require('./Admin/Routers/productrouter')
const adminrouter=require('./Admin/Routers/adminrouter')
const userrouter=require('./User/Routers/userrouter')
const orderrouter=require('./User/Routers/orderrouter')
const deliveryrouter=require('./User/Routers/deliveryrouter')
const cartrouter=require('./User/Routers/cartrouter')
const historyrouter=require('./User/Routers/historyrouter')
const reviewrouter=require('./User/Routers/reviewrouter')
const paymentrouter=require('./Admin/Routers/paymentrouter')
const pincoderouter=require('./Admin/Routers/pincoderouter')

const cors=require('cors')
const morgan=require('morgan')
require('dotenv/config')

//instance for express
const app=express()

//third party middleware
app.use(morgan('dev'))

app.use(cors())
app.use(express.json())

//routes
app.use("/admin/product",productrouter)
app.use("/admin/auth",adminrouter)
app.use('/admin/payment',paymentrouter)
app.use('/admin/pincode',pincoderouter)
app.use("/user/auth",userrouter)
app.use("/user/order",orderrouter)
app.use("/user/delivery",deliveryrouter)
app.use("/user/cart",cartrouter)
app.use('/user/history',historyrouter)
app.use('/user/review',reviewrouter)

//server
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('Server Started at Port :'+PORT)
})

//database connection
const MYDB=process.env.MYDB
mongoose.connect(MYDB)
db=mongoose.connection
db.on('open',(err)=>{
    if(err)
        console.log(err)
    else
        console.log('Database Connected')
})



