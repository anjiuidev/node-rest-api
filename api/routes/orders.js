const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkauth');
const orders = require('../controllers/orders');

router.get('/', checkAuth, orders.get_all_orders);

router.post('/', checkAuth, orders.post_order);

router.get('/:orderId', checkAuth, orders.get_single_order);

router.delete('/:orderId', checkAuth, orders.delete_order);

module.exports = router;