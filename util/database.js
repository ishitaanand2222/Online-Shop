const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;//_ indicates that this will be used internally in this file

const mongoConnect = callback =>{
    MongoClient.connect('mongodb+srv://ishitaanand2222:wpBOjnW7S9ei39G0@cluster0.prw0apx.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
    console.log('Connected');
    _db = client.db();
    callback();
})
.catch(err => {
    console.log("Not connected");
    console.log(err);
    throw err;
});
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found';
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;