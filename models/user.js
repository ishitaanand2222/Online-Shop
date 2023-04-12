const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User{
    User(username,email){
        this.name = username,
        this.email = email
    }

    save(){//to save this user to the database
        const db = getDb();
        return db.collection('users').insertOne(this)
        // .then(result => console.log(result))
        // .catch(err => console.log(err))
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