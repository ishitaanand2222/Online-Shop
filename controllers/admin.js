const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);
    product
    .save()
    .then( result => {
        console.log('Product created');
        res.redirect('/admin/products');
    })
    .catch( err => {
        console.log(err);
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;//here we are accessing the query. The extracted value is always a string 
    if(!editMode){//if editMode is false
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    
    Product.findByPk(prodId)
    .then(product => {
        if(!product)
        return res.redirect('/');

        res.render('admin/edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
    .catch(err => {console.log(err)});
}

//here we will construct a new product and will replace the existing one with the new product
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
  
    const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc,
      updatedImageUrl,
      prodId
    );
    product
      .save()
      .then(result => {//second promise from save
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };



exports.getProducts = (req,res,next) => {
    Product.fetchAll()
    .then(products => {
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    //Product.destroy({}), this is one way of destroying products, in the curly braces we can the pass the where condition to filter which product to delete
    Product.deleteById(prodId)
    .then(() => {//this is the then block for destroy() method
        console.log('PRODUCT DELETED');
        res.redirect('/admin/products');
    })
    .catch(err =>  console.log(err));
}