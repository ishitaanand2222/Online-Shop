const { or } = require('sequelize');
const Product = require('../models/product');
//const Cart = require('../models/cart');

exports.getProducts = (req, res, next) =>{
        Product.fetchAll()
        .then(products => {
            res.render('shop/product-list',{
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err);
        })
}

//this will help us extract the dynamic ID of each product
exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;//this productId will have the same variable name as the one which we used in the route
    // Product.findAll({where: {id: prodId}})//findAll can also be used to retrieve all products, but it returns an array of products
    // .then(products => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: '/products'
    //     });
    // })
    // .catch(err => {console.log(err)})
    //retrieving products using findByPk()//this gives only a single product
    Product.findByPk(prodId)//here in sequalize we dont get an array of products, rather we just get a single product
    .then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err=> console.log(err));
}
exports.getIndex =(req, res, next) =>{
    Product.fetchAll()
    .then(products => {
        res.render('shop/index',{ 
            prods: products, 
            pageTitle: 'Shop', 
            path:'/', 
           });
    })
    .catch(err => {
        console.log(err);
    })
  //  Product.fetchAll()//fetchAll doesn't work with sequalize
}

//here we would want to render the products associated with an existing user
exports.getCart = (req,res,next) => {
    req.user
    .getCart()
    .then(products => {
            res.render('shop/cart',{
                path:'/cart',
                pageTitle: 'Your Cart',
                products: products,
            });
        })
    .catch(err => console.log(err))
};

//deleting the product from the cart only
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; 
    req.user.deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

//adding new products to cart
exports.postCart = (req,res,next) => {
    const prodId = req.user.productId;
    Product.findByPk(prodId)
    .then(product => {
        return req.user.addToCart(product)
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    });
}

exports.postOrder = (req,res,next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req,res,next) => {
    req.user.getOrders({include: ['products']})
    .then(orders=> {
        res.render('shop/orders',{
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
}
