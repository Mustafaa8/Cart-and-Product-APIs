import type { Request,Response,NextFunction } from "express";
import productModel, { productDoc } from "../models/product.model.ts";
export const addProduct = async(req:Request<{},{},productDoc>,res:Response)=>{
    try{
        const product = await productModel.create(req.body)
        res.status(201).json(product)
    } catch(err){
        console.error(err)
        return res.status(400).json({"message":"and Error has occured"})
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id;
        const product = await productModel.findById(id)
        if(!product){
            return res.status(409).json({"message":"Product Not Found"})
        }
        await product.deleteOne()
        res.status(200).json({"message":"Product Deleted"})
    }catch(err){
        console.log(err)
        return res.status(400).json({"message":"and Error has occured"})
    }
}

export const editProduct = async(req:Request,res:Response)=>{
    
}

export const updateProduct = async(req:Request,res:Response)=>{
    const id = req.params.id;
    const product = await productModel.findById(id)
    if(!product){
        return res.status(400).json({"message":"Product Not Found"})
    }
    const update = req.body
    if(!update){
        return res.status(200).json({"message":"nothing to update"})
    }
    if(update.name){
        product.name = update.name; 
        await product.save()
    }
    if(update.price){
        product.price = update.price; 
        await product.save()
    }
    if(update.image){
        product.image = update.image; 
        await product.save()
    }
    if(update.quantity){
        product.quantity = update.quantity; 
        await product.save()
    }
    if(update.salePrice){
        product.salePrice = update.salePrice; 
        await product.save()
    }
    res.status(200).json({"message":"Updated Successfully"})
}