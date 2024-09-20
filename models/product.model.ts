import mongoose from 'mongoose'

export interface productDoc extends mongoose.Document{
    name:String,
    price:Number,
    image:String,
    quantity:Number,
    salePrice?:Number
}

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,default:null},
    quantity:{type:Number,default:1},
    salePrice:{type:Number}
})

const productModel = mongoose.model('Product',productSchema)

export default productModel