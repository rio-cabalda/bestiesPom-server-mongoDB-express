import express from "express";

import authentication from "./authentication";
import userCart from "./userCart";
import products from "./products";

const router = express.Router();

export default (): express.Router =>{
    authentication(router)
    userCart(router)
    products(router)
    return router;
}