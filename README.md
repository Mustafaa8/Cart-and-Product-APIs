# Cart and Product API

This project is an implementation for Cart and Product APIs that can be used within an E-commerce backend, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- Cart Management
- Product Management
- MongoDB Integration
- TypeScript Support

## Models

## Models

### Cart Model (cart.model.ts)

Defines the structure for shopping carts:
- Products: Array of items (product reference and quantity)
- Subtotal
- Total

Includes a pre-save middleware for automatic total calculations.

### Product Model (product.model.ts)

Defines the structure for products in the system.

## Controllers

### Cart Controller (cart.controller.ts)

Handles cart-related operations:
- Initiating a new cart
- Retrieving cart contents
- Adding products to the cart

### Product Controller (product.controller.ts)

Manages product-related operations:
- Creating new products
- Retrieving product details
- Updating product information
- Deleting products
- Listing all products

## API Endpoints

### Cart Operations
- POST api/cart - Create a new cart (intiateCart)
- GET api/cart/:cart_id - Retrieve cart details (showCart)
- POST api/cart/:cart_id/product/:product_id/:quantity - Add a product to the cart (addProductToCart)
- DELETE api/cart/:cart_id/product/:product_id/:amount - Remove a product from the cart
- DELETE api/cart/:cart_id - Clear the cart

### Product Operations
- GET api/product - List all products
- GET api/product/:id - Get details of a specific product
- POST api/product - Create a new product
- PUT api/product/:id - Update a product
- DELETE api/product/:id - Delete a product


## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure MongoDB connection
4. Start the server: `npm start`

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for improvements.

## License

This project is licensed under the MIT License.

