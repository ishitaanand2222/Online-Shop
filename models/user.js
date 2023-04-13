const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User{
    User(username, email, cart, id){
        this.name = username,
        this.email = email,
        this.cart = cart,// {items: []}
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
            updatedCartItems.push(
                {productId: new ObjectId(product._id), 
                quantity: newQuantity}
                )
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

    getCart(){
        //here will return a fully populated cart ie a cart with all the details
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        })
        //find(): all products in the cart
        return db.collection('products').find({_id: { $in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find( i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        })
    }

    deleteItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const db = getDb();
        return db.collection('users')
        .updateOne(
            {
                _id: new ObjectId(this._id)
            },
            { $set: {cart: {items: updatedCartItems}}}
        );
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