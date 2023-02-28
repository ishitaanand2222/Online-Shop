//core modules
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(path.dirname(require.main.filename), 
        'data',
        'products.json'
        );

const getProductsFromFile = cb => {//code refactoring ie the same code is being used 
        fs.readFile(p, (err, fileContent) => {//this process will take some time to execute becuz it is a callback
            if(err){
                return cb([]);
            }else{
                cb(JSON.parse(fileContent));
            }
        })

}
module.exports = class Product{
    constructor(id, title,imageUrl,description,price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){ 
        getProductsFromFile(products => {
            if(this.id){//if id is already existing then we dont want to create a new product rather we would update the product
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this; //this will have the entire product
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                products.push(this)//this is used to refer to the class and for this to not loose its context use it with a arrow function
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });//stringify function takes the JSON data and converts it into a js array, here we are writing file to the path p
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {//products here will contain all of my products
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);//here will have filter the product with the same id, we are able to do this because we already had parsed products earlier using JSON.parse(fileContent)
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        })
    }
    // it is a callback and is asynchronous
    static fetchAll(cb){//static ensures that the fetchAll() to be called on the class product and not on any instantiated object
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile(products => {//products here will contain all of my products
            const product = products.find(p => p.id === id);//here will have filter the product with the same id, we are able to do this because we already had parsed products earlier using JSON.parse(fileContent)
            cb(product);
        })
    }
}