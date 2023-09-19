import {Router}  from "express";
import { getAllProducts, addProducts } from "../controllers/productController";

export default (router: Router) => {
    router.get('/products', getAllProducts);
    router.post('/admin/products', addProducts); // run this route to automatically generate define product

   }
