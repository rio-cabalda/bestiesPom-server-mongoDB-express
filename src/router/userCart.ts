import {Router}  from "express";
import { userAuthentication } from "../middlewares/AuthMiddleware";
import { getUserCart, addToCart,updateCart, deleteCartItem, clearCart  } from '../controllers/cartController';
import validators from "../middlewares/validators/userValidation";
import checkInvalidatedToken from "../middlewares/checkInvalidatedToken";

export default (router: Router) => {
    router.get('/user/cart',checkInvalidatedToken, userAuthentication, getUserCart); // get user's cart
    router.post('/user/cart/:id',validators.quantity,checkInvalidatedToken, userAuthentication, addToCart);
    router.delete('/user/cart/clearcart',checkInvalidatedToken, userAuthentication ,clearCart);

    router.post('/user/cart/update/:id',checkInvalidatedToken, userAuthentication, updateCart);

    router.post('/user/cart/delete/:id', deleteCartItem);
}