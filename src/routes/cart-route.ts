import express from 'express';
import shoppingCart from '../models/cart-model';
const cart = express.Router();

let items: shoppingCart[] = [
    {id: 1, product: "drinks", price: 5.00, quantity: 10},
    {id: 2, product: "chairs", price: 7.00, quantity: 4},
    {id: 3, product: "subs", price: 4.00, quantity: 6},
    {id: 4, product: "table", price: 12.00, quantity: 1}
];

cart.get('/', (req, res) => {
    res.json("working")
})

export default cart;