import express from 'express'
import productModel from '../models/product.model.ts'
import type { productDoc } from '../models/product.model.ts'
import { addProduct,deleteProduct,updateProduct,getProduct, getAllProducts } from '../controllers/product.controller.ts'


const productRouter = express.Router()
productRouter.get('/api/product',getAllProducts)
productRouter.get('/api/product/:id',getProduct)
productRouter.post('/api/product',addProduct)
productRouter.delete('/api/product/:id',deleteProduct)
productRouter.put('/api/product/:id',updateProduct)

export default productRouter