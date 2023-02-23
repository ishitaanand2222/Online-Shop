const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const router = express.Router();

const products = [];

//router.use can be used for both get and post hence for only get request we can have router.get(), similarly for post, get.post()
router.get('/add-product',(req, res, next) => {
    res.render('add-product',{pageTitle: 'Add Product', path: '/admin/add-product'})// this path can be anything 
    //after router and before creating server, it allows us to add a new middleware function
    //it also automatically sets the header,though we can also do it explicitly by res.setHeader();
    //res.send is also an indication of not putting next in here
    //here we have injected the dirname into rootDir variable 
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
});

router.post('/add-product',(req,res,next) =>{
    products.push({title: req.body.title})
    res.redirect('/');
})
//module.exports = router;
exports.routes = router;
exports.products = products;