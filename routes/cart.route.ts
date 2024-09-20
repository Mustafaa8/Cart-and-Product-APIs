import express from 'express'
import {intiateCart,showCart,addProductToCart,clearCart,deleteProductFromCart} from "../controllers/cart.controller.ts"
const cartRouter = express.Router()

cartRouter.post('/api/cart/new_cart',intiateCart)
cartRouter.post('/api/cart/:cart_id/product/:product_id/:quantity',addProductToCart)
cartRouter.get('/api/cart/:cart_id',showCart)
cartRouter.delete("/api/cart/:cart_id/clear",clearCart)
cartRouter.delete('/api/cart/:cart_id/product/:product_id/:amount',deleteProductFromCart)

export default cartRouter
