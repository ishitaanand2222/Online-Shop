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
        // const cartProduct = this.cart.items.findIndex( cp => {
        //     return cp._id === product._id;
        // })
        
        //if product is not present in the cart
        //items is the property which we have defined and items will have all the existing properties of product + One additional property which is quantity
        const updatedCart = {
            items: [{productId: new ObjectId(product._id), quantity: 1}]
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