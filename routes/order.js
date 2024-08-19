const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middlewares/auth'); // Middleware to authenticate user

const router = express.Router();

// Place order
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.artId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const items = cart.items.map(item => ({
      artId: item.artId._id,
      quantity: item.quantity,
      price: item.artId.price,
    }));

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      userId,
      items,
      totalAmount,
    });

    await order.save();
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate('items.artId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
