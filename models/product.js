//core modules
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 
        'data',
        'products.json'
        );

const getProductsFromFile = cb => {//code refactoring
        fs.readFile(p, (err, fileContent) => {//this process will take some time to execute becuz it is a callback
            if(err){
                return cb([]);
            }else{
                cb(JSON.parse(fileContent));
            }
        })

}
module.exports = class Product{
    constructor(title,imageUrl,description,price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){ 
        getProductsFromFile(products => {
            products.push(this)//this is used to refer to the class and for this to not loose its context use it with a arrow function
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });//stringify function takes the JSON data and converts it into a js array, here we are writing file to the path p
        });
    }

    // it is a callback and is asynchronous
    static fetchAll(cb){//static ensures that the fetchAll() to be called on the class product and not on any instantiated object
        getProductsFromFile(cb);
    }
}