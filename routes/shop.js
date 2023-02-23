const path = require('path');
const express = require('express')

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) =>{
    const products = adminData.products
    res.render('shop',{ 
        prods: products, 
        pageTitle: 'Shop', 
        path:'/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        formsCSS: true,
        activeAddProduct: true,
       });//it will look for the default templating engine

   // console.log('shop.js',adminData.products);
    //after router and before creating server, it allows us to add a new middleware function
   // res.send('<h1>Hello from express</h1>');//it also automatically sets the header,though we can also do it explicitly by res.setHeader();
    //res.send is also an indication of not putting next in here
    //path.join yeilds a path and this will have a global variable __dirname(it will hold the absolute path from our os to this folder of out project)we are using path.join becuz it detects 
    //our os and develops a path , '../' or '..'  will help us go one level up
   // res.sendFile(path.join(rootDir, 'views', 'shop.html'));//'/views/shop.html' will not work becuz '/' refers to the root folder of Operating system and not of this folder
});

module.exports = router;