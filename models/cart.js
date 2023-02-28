const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };//cart will have products and totalPrice
            if(!err){
                cart = JSON.parse(fileContent);
            }
            //Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            //Add new product or increase quantity
            if(existingProduct){
                updatedProduct = {...existingProduct}//updatedProduct will have all properties of existing product
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            }
            else{//if product doesn't exist
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]//upadting cart with new products
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //+productPrice to make string  number
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
              });
        })
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p, (err,fileContent) => {
            if(err){
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            //checking the number of times we have this product
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product){//if the product is not present in the cart then return as we dont want the further code to be executed
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = fileContent.productPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
              });
        })
    }

    //fetching all items of cart to display in /cart
    static getCart(cb){
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null)
            }else{
                cb(cart)
            }
        })
    }
}