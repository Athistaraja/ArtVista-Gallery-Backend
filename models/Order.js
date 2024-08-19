const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  items: [{
    artId: { type: mongoose.Schema.Types.ObjectId, ref: 'Art',required: true,},
    quantity: { type: Number, required: true, },
    price: { type: Number, required: true, },
  }],
  totalAmount: { type: Number, required: true,},
  status: { type: String, default: 'Pending', },
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
