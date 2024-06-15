const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
    {
        customerName: { type: String, required: true },
        customerPhoneNumber: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        //calculate tax => 2 % => ((2 *totalAmount)/100)
        tax: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        paymentMode: { type: String, required: true },
        cartItems: { type: Array, required: true }

    },
    { timestamps: true }
);

const billModel = mongoose.model("bills", billSchema)

module.exports = billModel