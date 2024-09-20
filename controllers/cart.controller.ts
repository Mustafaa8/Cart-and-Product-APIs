import type { Request,Response,NextFunction } from 'express'
import { cartModel } from '../models/cart.model.ts'
import type { cartDoc } from '../models/cart.model.ts'

import productModel, { productDoc } from '../models/product.model.ts'

export const intiateCart = async(req:Request,res:Response)=>{
    try{
        const cart = new cartModel({})
        await cart.save()
        res.status(200).json({
            "message":"Cart Created Successfully",
            "Cart":cart
        })
    } catch(err){
        console.log(err)
        return res.status(400).json({"message":"an error has occured"})
    }
}

export const showCart = async(req:Request,res:Response)=>{
    try{
        const cartId = req.params.cart_id
        const cart = await cartModel.findById(cartId)
        if(!cart){
            return res.status(404).json({"message":"No Cart with that id"})
        }
        await cart.populate('products')
        res.json(cart)
    } catch(err){
        console.log(err)
        return res.status(400).json({"message":"an error has occured"})
    }
}

export const addProductToCart = async(req:Request,res:Response)=>{
    try{
    const cartId = req.params.cart_id;
    const productId = req.params.product_id
    const quantity = parseInt(req.params.quantity) || 1 
    const product = await productModel.findById(productId)
    const cart = await cartModel.findById(cartId)
    if(!product){
        return res.status(404).json({"message":"product doesn't exist"})
    }
    if(!cart){
        return res.status(404).json({"message":"No Cart with that id"})
    }
    if(!cart.products || cart.products.length === 0){
        cart.products.push({product:productId,quantity:quantity})
    } else {
    for(const productObj of cart.products){
        if(productId == productObj.product){
            productObj.quantity += quantity
            await cart.save()
        return res.status(201).json({
            "message":"Product added",
            "Cart":cart
        })
    }

}
    cart.products.push({product:productId,quantity:quantity})}
    await cart.save()
    res.status(201).json({
            "message":"Product added",
            "Cart":cart
        })
}   catch(err){
        console.log(err)
        return res.status(400).json({"message":"an error has occured"})
}
}

export const clearCart = async(req:Request,res:Response)=>{
    try{
        const cartId = req.params.cart_id
        const cart = await cartModel.findById(cartId) as cartDoc
        if(!cart){
            return res.status(404).json({"message":"No Cart with that id"})
        }
        await cart.clear()
        res.json({
            "message":"Cart Cleared Successfully",
            "cart":cart
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({"message":"an error has occured"})
    }
}

export const deleteProductFromCart = async(req:Request,res:Response)=>{
    const cartId = req.params.cart_id
    const productId = req.params.product_id
    const amount = parseInt(req.params.amount) || 1
    const cart = await cartModel.findById(cartId)
    const product = await productModel.findById(productId)
    if(!product){
        return res.status(404).json({"message":"product doesn't exist"})
    }
    if(!cart){
        return res.status(404).json({"message":"No Cart with that id"})
    }
    if(!cart.products || cart.products.length === 0){
        res.status(404).json({"message":"Cart is already empty"})
    }
    for(const productObj of cart.products){
        if(productId == productObj.product){
            if(amount >= productObj.quantity){
                cart.products.remove(productObj)
            } else {
                productObj.quantity -= amount
            }
        } else{
            return res.status(404).json({"message":"Product isn't in the cart"})
        }
        await cart.save()
        res.json({
            "message":"product removed Successfully",
            "cart":cart
        })
    }
}