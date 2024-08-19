const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Your Cart model
const {auth} = require('../middleware/auth'); // Your auth middleware

// Get cart items for a user
router.get('/:userId', auth, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId }).populate('artworkId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add/update cart item
router.post('/', auth, async (req, res) => {
  const { userId, artworkId, quantity } = req.body;

  try {
    let cartItem = await Cart.findOne({ userId, artworkId });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, artworkId, quantity });
      await cartItem.save();
    }

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a cart item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
