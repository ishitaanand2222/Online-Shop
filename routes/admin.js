const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const productsController = require('../controllers/products');

const router = express.Router();


//router.use can be used for both get and post hence for only get request we can have router.get(), similarly for post, get.post()
router.get('/add-product', productsController.getAddProduct);// this path can be anything 
    //after router and before creating server, it allows us to add a new middleware function
    //it also automatically sets the header,though we can also do it explicitly by res.setHeader();
    //res.send is also an indication of not putting next in here
    //here we have injected the dirname into rootDir variable 
    //res.sendFile(path.join(rootDir,'views','add-product.html'));


router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// //exports.products = products;