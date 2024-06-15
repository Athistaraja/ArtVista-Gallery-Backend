const express = require('express');
const itemsModel = require("../model/itemsModel")

const router = express.Router()

router.post("/add-items", async (req, res) => {
    try {
        const newItems = new itemsModel(req.body)
        await newItems.save()//create a new item
        res.send("Item added successfully")

    } catch (error) {
        res.status(400).json(error)
    }
})


router.get("/get-items", async (req, res) => {
    try {
        const items = await itemsModel.find()
        res.send(items)

    } catch (error) {
        res.status(400).json(error)
    }
})



router.post("/delete-items", async (req, res) => {
    try {
        const item = await itemsModel.findOneAndDelete({ _id: req.body.itemId })
        item
            ? res.send("Item deleted successfully")
            : res.status(401).send({ message: "Item not found" })

    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/edit-items", async (req, res) => {
    try {
        await itemsModel.findOneAndUpdate({ _id: req.body.itemId }, req.body)
        res.send("Item updated successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router