import {Request, Response} from 'express';
import { getProductById, getProducts } from '../service/productsService';
import { petProduct } from '../utils/products';
import ProductModel from '../models/ProductModel';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.status(200).json({products: products});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const addProducts = async (req: Request, res: Response) => {

    await ProductModel.insertMany(petProduct);
    console.log('insert finish');
res.status(200).json({message: "Pre-define Products successfully added"})
}

export const singleProduct = async(req: Request, res: Response) => {
    try {
        const reqProductId = req.params.id;
        const singleProduct = await getProductById(reqProductId);
        
        if(!singleProduct) return res.status(401).json({ error: 'Product not found' }); 
        return res.status(200).json({product: singleProduct}); 
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
} 