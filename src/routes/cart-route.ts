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
    if (req.query.maxPrice) {
        let newPrice = parseInt(req.query.maxPrice as string);
        const maxPriceFilter = items.filter(pricey => pricey.price <= newPrice)
        res.json(maxPriceFilter);
    } else if (req.query.prefix) {
        let result = [];
        let search = req.query.prefix as string;
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




    // res.json(items);
    // res.status(200);
})

export default cart;