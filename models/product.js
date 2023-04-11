const getDb = require('../util/database').getDb;//helps to get access to the database
class Product{
    constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        const db = getDb();
        return db.collection('products')
        .insertOne(this)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    static fetchAll(){
        const db = getDb();
        return db
        .collection('products')
        .find()//find function helps us return our data we can also filter this data
        .toArray()//if we have less data, say 100 documents, then we can convert them into an array otherwise we can also use pagination for large data
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => console.log(err))
    }
}


module.exports = Product;