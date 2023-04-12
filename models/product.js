const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;//helps to get access to the database
class Product{
    constructor(title, price, description, imageUrl, id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save(){
        const db = getDb();
        let dpOp;
        if(this._id){
            //update the product
            dbOp = db
            .collection('products')
            .updateOne({_id: new mongodb.ObjectId(this._id)}, { $set: this});
        }else{
            dbOp = db.collection('products').insertOne(this);
        }

        return dpOp
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
    //fetching a single product
    static findByPk(prodId){
        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(prodId) })//since the _id is stored in the form of objectId type in mongodb; new is calling a constructor
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => console.log(err));
    }
}


module.exports = Product;