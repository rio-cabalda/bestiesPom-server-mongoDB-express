import {Router}  from "express";
import { userAuthentication } from "../middlewares/AuthMiddleware";
import { getUserCart, addToCart,updateCart, clearCart  } from '../controllers/cartController';
import validators from "../middlewares/validators/userValidation";
import checkInvalidatedToken from "../middlewares/checkInvalidatedToken";
const path = require('path');

export default (router: Router) => {
    router.get('/user/cart',checkInvalidatedToken, userAuthentication, getUserCart); // get user's cart
    router.post('/user/cart/:id',validators.quantity,checkInvalidatedToken, userAuthentication, addToCart);
    router.delete('/user/cart/clearcart',checkInvalidatedToken, userAuthentication ,clearCart);

    router.post('/user/cart/update/:id',checkInvalidatedToken, userAuthentication, updateCart); // this route has update quantity and delete item by passing 0 value of quantity.
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
      });
}