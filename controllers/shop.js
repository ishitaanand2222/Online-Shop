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

//here we would want to render the products associated with an existing user
exports.getCart = (req,res,next) => {
    // console.log(req.user.cart);we cannot access cart like this
    req.user
    .getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart',{
                path:'/cart',
                pageTitle: 'Your Cart',
                products: products,
            })
        })
        .catch(err => console.log(err) )  
    })
    .catch(err => {console.log(err)})
};

//deleting the product from the cart only
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; 
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where : { id: prodId}});
    })
    .then(products => {
        const product = products[0];
        product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
    })
}

//adding new products to cart
exports.postCart = (req,res,next) => {
    const prodId = req.user.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
    .getCart()
    .then(cart => {
        //here we'll check if product is already a part of the cart, if it is then we'll just increase the quantity of the product
        fetchedCart = cart;
        return cart.getProducts({where: { id: prodId } });
    })
    .then(products => {
        let product;
        if(products.length > 0){
            product = products[0];
        }
        if(product){//if an existing product, increase quantity by 1, for many to many relationships
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return  Product.findByPk(prodId)
    })
    .then((product) => {
        return fetchedCart.addProduct(product, {
            through: {quantity: newQuantity}
        })
    })
    .then(() => {
        res.redirect('/cart');//to redirect to this page when the item has been added
    })
    .catch(err => console.log(err));
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