const express = require('express');
const Cart = require('../models/Cart');
const { auth, checkRole } = require('../middleware/auth');
const router = express.Router();

// Add or update an item in the cart
router.post('/add', auth,checkRole(['user']), async (req, res) => {
  const { artworkId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        user: req.user.id,
        items: [{ artwork: artworkId, quantity }]
      });
    } else {
      // If cart exists, check if the item is already in the cart
      const itemIndex = cart.items.findIndex(item => item.artwork.toString() === artworkId);

      if (itemIndex > -1) {
        // If item exists, update the quantity
        cart.items[itemIndex].quantity += quantity;

        // If quantity is zero or less, remove the item
        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else {
        // If item does not exist, add it to the cart
        if (quantity > 0) {
          cart.items.push({ artwork: artworkId, quantity });
        }
      }
    }

    // Save the updated cart
    await cart.save();
    res.status(200).send(cart);

  } catch (error) {
    res.status(500).send({ error: 'Failed to update cart' });
  }
});

// Remove an item from the cart
router.post('/remove', auth,checkRole(['user']), async (req, res) => {
  const { artworkId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // Find the item index
      const itemIndex = cart.items.findIndex(item => item.artwork.toString() === artworkId);

      if (itemIndex > -1) {
        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).send(cart);
      } else {
        res.status(404).send({ error: 'Item not found in cart' });
      }
    } else {
      res.status(404).send({ error: 'Cart not found' });
    }

  } catch (error) {
    res.status(500).send({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
