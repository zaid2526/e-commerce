const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cartPage',shopController.postCartPage)
router.post('/delete-cart-item',shopController.deleteCartItem)
router.post('/createOrder',shopController.postOrder)


module.exports = router;