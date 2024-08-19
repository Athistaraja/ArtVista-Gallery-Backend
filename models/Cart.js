const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
