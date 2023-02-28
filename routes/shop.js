const path = require('path');
const express = require('express')

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts);

// :productId (this part can be anything)
router.get('/products/:productId', shopController.getProduct);//we can tell the express router that we have variable by using : and we can have any name after that like productID to get that variable

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;