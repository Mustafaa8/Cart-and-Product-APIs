import express from 'express'
import productModel from '../models/product.model.ts'
import type { productDoc } from '../models/product.model.ts'
import { addProduct,deleteProduct,updateProduct } from '../controllers/product.controller.ts'


const productRouter = express.Router()
productRouter.get('/api/product',async(req,res)=>{
    const allProducts = await productModel.find({})
    res.json(allProducts)
})
productRouter.post('/api/product',addProduct)
productRouter.delete('/api/product/:id',deleteProduct)
productRouter.put('/api/product/:id',updateProduct)

export default productRouter