import express from 'express';
import shoppingCart from '../models/cart-model';
const cart = express.Router();

let items: shoppingCart[] = [
    {id: 1, product: "cold drinks", price: 5.00, quantity: 10},
    {id: 2, product: "metal chairs", price: 7.00, quantity: 4},
    {id: 3, product: "cold subs", price: 4.00, quantity: 6},
    {id: 4, product: "metal table", price: 12.00, quantity: 1}
];

cart.get('/', (req, res) => {
    if (req.query.maxPrice&&req.query.prefix&&req.query.pageSize){
        let newPrice = parseInt(req.query.maxPrice as string);
        let search = req.query.prefix as string;
        let page = parseInt(req.query.pageSize as string);
        const maxPriceFilter = items.filter(pricey => pricey.price <= newPrice)
        let result = [];
        for (let i = 0; i < maxPriceFilter.length; i++) {
            if (maxPriceFilter[i].product.startsWith(search)) {
                result.push(maxPriceFilter[i]);
            }
        }
        const onlys = result.slice(0, page)
        res.json(onlys);
    } else if (req.query.maxPrice&&req.query.prefix) {
        let newPrice = parseInt(req.query.maxPrice as string);
        let search = req.query.prefix as string;
        const maxPriceFilter = items.filter(pricey => pricey.price <= newPrice)
        let result = [];
        for (let i = 0; i < maxPriceFilter.length; i++) {
            if (maxPriceFilter[i].product.startsWith(search)) {
                result.push(maxPriceFilter[i]);
            }
        }
        res.json(result);
    } else if (req.query.maxPrice&&req.query.pageSize) {
        let newPrice = parseInt(req.query.maxPrice as string);
        let page = parseInt(req.query.pageSize as string);
        const maxPriceFilter = items.filter(pricey => pricey.price <= newPrice)
        const onlys = maxPriceFilter.slice(0, page)
        res.json(onlys);
    } else if (req.query.prefix&&req.query.pageSize) {
        let search = req.query.prefix as string;
        let page = parseInt(req.query.pageSize as string);
        let result = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].product.startsWith(search)) {
                result.push(items[i]);
            }
        }
        const onlys = result.slice(0, page)
        res.json(onlys);
    } else if (req.query.maxPrice) {
        let newPrice = parseInt(req.query.maxPrice as string);
        const maxPriceFilter = items.filter(pricey => pricey.price <= newPrice)
        res.json(maxPriceFilter);
    } else if (req.query.prefix) {
        let search = req.query.prefix as string;
        let result = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].product.startsWith(search)) {
                result.push(items[i]);
            }
        }
        res.json(result);
    } else if (req.query.pageSize) {
        let page = parseInt(req.query.pageSize as string);
        const onlys = items.slice(0, page)
        res.json(onlys);
    } else {
        res.json(items);
    }
})


cart.get("/:id", (req, res) => {
    let index = parseInt(req.params.id as string)
    for (let i = 0; i < items.length; i++) {
        if(items[i].id === index) {
            res.json(items[i]);
        }
    }
})

let nextID = 5;
cart.post("/", (req, res) => {
    let newItem:shoppingCart = req.body; //setting newShop properties to request properties
    newItem.id = nextID;
    nextID += 1;
    items.push(newItem);
    res.status(201)
    res.json(newItem);
})

cart.put("/:id", (req, res) => {
    for(let i = 0; i < items.length; i++) {
        let edit = parseInt(req.params.id as string)
        if(items[i].id === edit) {
            items[i].product = req.body.product;
            items[i].price = req.body.price;
            items[i].quantity = req.body.quantity;
            items[i].id = edit
            res.json(items[i])
            break;
        }
    }
})

cart.delete("/:id", (req, res) => {
    let tobeDeleted:number = Number.parseInt(req.params.id);
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === tobeDeleted) {
            items.splice(i, 1);
        }
    }
    res.status(204);
    res.json("delete was successful");
})

export default cart;