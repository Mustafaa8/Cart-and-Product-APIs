import mongoose from 'mongoose'
import type { productDoc } from './product.model'
import productModel from './product.model'

interface cartItem extends Object{
    product:mongoose.Types.ObjectId,
    quantity:number
}

export interface cartDoc extends mongoose.Document {
    products:Array<cartItem>,
    subTotal:number,
    total:number,
    clear():void
}


const cartSchema = new mongoose.Schema({
    products:[
        {product:{type:mongoose.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,default:1,min:1}}
    ],
    subTotal:{type:Number,default:0},
    total:{type:Number,default:0}
})

cartSchema.pre<cartDoc>('save', function(next) {
    const cart = this
    if(!cart.products || cart.products.length === 0){
        cart.total = 0
        cart.subTotal = 0
        return next()
    }
    let priceSum = 0
    let actualPriceSum = 0
    const productPromises = cart.products.map(async (productObj) => {
        const product = await productModel.findById(productObj.product)
        if (!product) {
            return
        }
        if (!product.salePrice || product.salePrice <= 0) {
            priceSum += product.price * productObj.quantity
        } else {
            priceSum += product.salePrice * productObj.quantity
        }
        actualPriceSum += product.price * productObj.quantity
    })
    Promise.all(productPromises).then(() => {
        cart.subTotal = actualPriceSum
        cart.total = priceSum
        next()
    }).catch(next)
})

cartSchema.methods.clear = async function(this:cartDoc){
    const cart = this
    if(!cart.products || cart.products.length === 0){
        return 
    }
    cart.products = []
    cart.total= 0
    cart.subTotal = 0
    await cart.save()
}

export const cartModel = mongoose.model('Cart',cartSchema)
