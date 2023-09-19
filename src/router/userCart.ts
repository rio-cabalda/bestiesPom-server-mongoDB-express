import {Router}  from "express";
import { userAuthentication } from "../middlewares/AuthMiddleware";
import { getUserCart, addToCart,updateCart, deleteCartItem, clearCart  } from '../controllers/cartController';
import validators from "../middlewares/validators/userValidation";

export default (router: Router) => {
    router.get('/user/cart',userAuthentication, getUserCart); // get user's cart
    router.post('/user/cart/:id',validators.quantity,userAuthentication, addToCart);
    router.delete('/user/cart/clearcart',userAuthentication ,clearCart);

    router.post('/user/cart/update/:id',userAuthentication, updateCart);


    router.post('/user/cart/delete/:id', deleteCartItem);
}


