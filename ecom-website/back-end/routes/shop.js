const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.post('/products',shopController.postProduct)
// router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cartPageByPage',shopController.postCartPage);
router.post('/delete-cart-item',shopController.deleteCartItem);
router.get('/getOrders',shopController.getOrders);
router.post('/createOrder',shopController.postOrder);


module.exports = router;