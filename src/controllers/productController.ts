const faker = require('faker');
import {Request, Response} from 'express';
import { getProductById, getProducts } from '../service/productsService';
import { petProduct } from '../utils/products';
import ProductModel from '../models/ProductModel';
import fetchedImages from '../api/fetchImage';
import shuffleArray from '../utils/shuffleArray';
import reviewComments from '../utils/reviews';


faker.locale = 'en';

interface User {
    image: string;
    email: string;
  }
  
  interface ProductReview {
    user: User;
    rating: number;
    comment: string;
  }

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

export const productReviews = async(req: Request, res: Response) =>{
    
    try {
    // Generate reviews in single product page.

    const numReviews = 10; // Number of reviews to generate
    const reviews: ProductReview[] = [];
    
    // fetch image from unsplash.
    const imageUrls = await fetchedImages() || [];
    // shuffle image and comment and return 10 values inside the array
    const assignComment = shuffleArray(reviewComments, numReviews);
    const userImage = shuffleArray(imageUrls, numReviews);

    // loop 10 reviews and assign each and ever user review a user email, rating, 
    for (let i = 0; i < numReviews; i++) {        
        // Generate a male first name
        const maleName: string = faker.name.firstName(0); 
        
        const emailDomains: string[] = ['gmail.com', 'yahoo.com', 'hotmail.com'];
        const randomDomain: string = faker.random.arrayElement(emailDomains);
        const generateEmail: string = `${maleName.toLowerCase()}@${randomDomain}`;
        const user: User = {
            image: userImage[i] ? userImage[i] : 'https://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png', // Use a fetched image URL
            email: generateEmail,
        };
        const rating: number = parseFloat(
            (faker.datatype.number({ min: 39, max: 50 }) / 10).toFixed(1)
        );
        const review:ProductReview = {
        user,
        rating,
        comment:assignComment[i],
        };

        reviews.push(review);
    }
    return res.status(200).json(reviews);
} catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
}
}