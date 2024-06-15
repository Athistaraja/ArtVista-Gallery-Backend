const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const itemRoute = require("./routes/itemRoute")
const billRoute = require("./routes/billRoute")

const app = express();

const PORT = 8000;
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Artvista Gallery");
});



app.use("/users", userRoute)
app.use("/items", itemRoute)
app.use("/bills", billRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongodb is Connected!");
        app.listen(PORT, () => console.log("Server started on the PORT", PORT))
    })
    .catch((error) => {
        console.log("Error", error)
    })
