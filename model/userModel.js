const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true, },
        password: { type: String, required: true, },
        verified: { type: Boolean, required: true, },
        role: { type: String, required: true, default: "user", enum: ["admin", "user"] },
    },
    { timestamps: true }
);

const userModel = mongoose.model("users", userSchema)

module.exports = userModel