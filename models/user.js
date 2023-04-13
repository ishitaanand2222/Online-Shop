const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User{
    User(username, email, cart, id){
        this.name = username,
        this.email = email,
        this.cart = cart,
        this._id = id
    }

    save(){//to save this user to the database
        const db = getDb();
        return db.collection('users').insertOne(this)
        // .then(result => console.log(result))
        // .catch(err => console.log(err))
    }

    addToCart(product){
        //if the product already exist
        const cartProductIndex = this.cart.items.findIndex( cp => {
            return cp.productId.toString() === product._id.toString();
        })
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0){//if item is having an index ie already present hence quantity + 1
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else{//if product is not present in the cart
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity})
        }
        const updatedCart = {
            items: updatedCartItems
        };

        const db = getDb();
        db.collection('users').updateOne(
            {_id : new ObjectId(this._id)}, 
            {$set: {cart: updatedCart}}//it will override the old cart with new cart
        )
    }

    static findUserByPk(userId){
        const db = getDb();
        return db
        .collection('users')
        .findOne({_id: new ObjectId(userId)})
        .then(user => {
            console.log(user)
            return user;
        })
        .catch(err => console.log(err))
    }
}

module.exports = User;