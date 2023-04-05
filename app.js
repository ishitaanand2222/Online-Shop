const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));//it serves static files,it takes a path to the file to which we want to give read access to

app.use((req,res,next) => {//app.use only registers the middleware, it doesnt run any incoming request, any incoming request will only be executed when we lister to our server, and npm start will first listen to server for any incoming request
  User.findByPk(1).then(user => {
    //retrieving user
    req.user = user;//adding a new field in the request, we can add new fields provided that they dont exist previously
    next();
  })
  .catch(err => console.log(err));
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//RELATIONS
//this relationship.. as in not user bought the product but user created the product
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});//on deleting user any price related to user will also be deleted
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
//many-many relationship, this works with an intermediate which contains a collection of productId & cartId, which is basically a colle
Cart.belongsTo(Product,{ through: CartItem});
Product.belongsTo(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});//through an intermediate table i.e OrderItem


sequelize
// .sync({force: true})//force, in order to overwrite
.sync()
.then(result => {//it syncs your models to the database and helps you create tables (from the models)
  return User.findByPk(1);
  //  console.log(result);
})
.then(user => {
  if(!user){
    return User.create({name: 'Max', email:'test@test.com'})
  }
  return user;
})
.then(user =>{
//  console.log(user);
//create a cart for the user
  return user.createCart()
})
.then(cart => {
  app.listen(3000);
})
.catch(err => {
    console.log(err);
})