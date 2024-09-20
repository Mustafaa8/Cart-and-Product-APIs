import express from 'express'
import dotenv from 'dotenv'
import productRouter from './routes/product.route'
import cartRouter from './routes/cart.route'
import dbConnection from './utils/db'
// app & its config
dotenv.config()
const port = process.env.PORT
const app = express()
// Middlewares
app.use(express.json())
// API Routes
app.use('/',productRouter)
app.use('/',cartRouter)
// Listening to port 
app.listen(port,()=>{
    console.log(`server is working at port ${port}`)
    dbConnection()
})
