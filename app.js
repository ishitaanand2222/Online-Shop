const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));//it serves static files,it takes a path to the file to which we want to give read access to

app.use((req,res,next) => {//app.use only registers the middleware, it doesnt run any incoming request, any incoming request will only be executed when we lister to our server, and npm start will first listen to server for any incoming request
  // User.findByPk(1).then(user => {
  //   //retrieving user
  //   req.user = user;//adding a new field in the request, we can add new fields provided that they dont exist previously
  //   next();
  // })
  // .catch(err => console.log(err));
})

app.use('/admin',adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
})