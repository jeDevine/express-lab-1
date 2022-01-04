import express from 'express';
import cors from 'cors';
import cart from './routes/cart-route';

const app = express();

app.use(cors());

const port = 3000; //default is 3000

// routes
app.use(express.json());
app.use('/cart-items', cart)

app.listen(port,() => console.log(`Listening on ${port}`));