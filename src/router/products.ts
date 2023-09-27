import {Router}  from "express";
import { getAllProducts, addProducts, singleProduct } from "../controllers/productController";

export default (router: Router) => {
    router.post('/admin/products', addProducts); // run this route to automatically generate define product
    router.get('/products', getAllProducts);
    router.get('/product/:id', singleProduct);

   }
