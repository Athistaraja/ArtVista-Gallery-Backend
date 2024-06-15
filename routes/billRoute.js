const express = require('express');
const billsModel = require("../model/billsModel")

const router = express.Router()

router.post("/charge-bill", async (req, res) => {
    try {
        const newBill = new billsModel(req.body)
        await newBill.save() //creates a new bill
        res.send("Bill saved successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/get-bill", async (req, res) => {
    try {
        const bills = await billsModel.find()
        res.send(bills)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router