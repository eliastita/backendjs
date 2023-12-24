// import {ProductManager,Product}  from "./main.js"
// const pm  = new ProductManager();

import express from "express";
const app = express();

// {ProductManager: ProductManager, Product : Product}=
import ProductManager from "./main.js";
const pm = new ProductManager()


app.get('/products', async (req, res) => {
    const limit = Number(req.query.limit)
    const products = await (pm.getProducts2())
    if (limit !== 0) {
        res.json({products})
    } else {
        let limitFilter = products.slice(0, limit);
        res.json({products: limitFilter})
    }
})

app.get('/products/:pid',async (req, res) => {
    const pid = Number(req.params.pid)
    const producto = await pm.getProductById2(pid)
    if (producto){
        res.json(producto)
    }else res.send("<h1>ERROR</h1>")

})

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})
