const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));//it serves static files,it takes a path to the file to which we want to give read access to

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//RELATIONS
//this relationship.. as in not user bought the product but user created the product
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});//on deleting user any price related to user will also be deleted
User.hasMany(Product);

//sequelize.sync({force: true})//force, in order to overwrite
sequelize.sync()
.then(result => {//it syncs your models to the database and helps you create tables (from the models)
  //  console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})