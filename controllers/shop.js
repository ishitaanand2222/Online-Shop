const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) =>{
        Product.findAll().then(products => {
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
    Product.findAll().then(products => {
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

exports.getCart = (req,res,next) => {
    Cart.getCart(cart => {//this will help us have all products in the cart
        Product.fetchAll(products => {
            const cartProducts = [];//it will contain all the products of the cart
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart',{
                path:'/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        })
    })
};

//deleting the product from the cart only
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; 
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);//here we are getting the Cart model and we are adding product according to its availability
    });
    res.redirect('/cart');
}
exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}