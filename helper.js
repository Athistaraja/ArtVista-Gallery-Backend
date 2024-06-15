import { client } from "./index.js";
import {bcrypt} from "bcrypt";


async function getAllProducts(query) {
    return await client.db("artvista").collection("products").find(query).toArray();
}
async function getProductById(id) {
    return await client.db("artvista").collection("products").findOne({ id: id });
}
async function addProducts(newProduct) {
    return await client.db("artvista").collection("products").insertMany(newProduct);
}
async function deleteProductById(id) {
    return await client.db("artvista").collection("products").deleteOne({ id: id });
}

async function updateProductById(id, updatedProduct) {
    return await client.db("artvista").collection("products").updateOne(
        { id: id },
        { $set: updatedProduct });
}


async function genPassword(password) {
    const salt = await bcrypt.genSalt(10)//bcrypt.genSalt(no. of rounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword);
    return hashedPassword
}

async function createUser(username,email, hashedPassword) {
    return await client.db("artvista").collection("users")
        .insertOne({ username: username,email:email, password: hashedPassword });
}



async function getUserByName(username) {
    return await client.db("artvista").collection("users")
        .findOne({ username: username });
}


export { getAllProducts, getProductById, addProducts, deleteProductById, updateProductById, genPassword, createUser, getUserByName }