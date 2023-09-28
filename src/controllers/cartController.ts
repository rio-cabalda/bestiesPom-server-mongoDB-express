import {Request, Response} from 'express';
import { getUserById } from '../service/usersService';
import { getProductById } from '../service/productsService';
import {AuthenticatedRequest} from '../types/UserTypes'
import { Types } from 'mongoose';
import { cartItemSchema } from '../models/UserModel';

export const getUserCart = async  (req:AuthenticatedRequest, res: Response) => {

  try {
    const { id:userId } = req.user;
    const user = await getUserById(userId).populate('cart.product');

    if (!user) return res.status(401).json({ error: 'User not exist' });

    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
}

export const addToCart = async  (req:AuthenticatedRequest, res: Response) => {
    // TODO:
    // add populate function to show the products details in the cart
  try {
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const { id:userId } = req.user;

    // Find the user by userId
    const user = await getUserById(userId);

    if (!user) return res.status(401).json({ error: 'User not exist' });

    // Find the product by productId
    const product = await getProductById(productId);

    if (!product) return res.status(400).json({error: "Product not found"})
    
    if(quantity > product.stock) return res.status(400).json({message: `Out of stock. Our product current stocks is ${product.stock}`});

    // Check if the product already exists in the user's cart
    const cartItemIndex = user.cart.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

    if (cartItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      const userCartQty = user.cart[cartItemIndex].quantity;
     
      if((userCartQty + quantity) > product.stock) return res.status(400).json({message: `Invalid value. Total purchase is ${userCartQty+quantity}. Our product current stocks is ${product.stock}`});
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      user.cart.push({
        product: product._id,
        quantity: quantity,
      });
    }

    // Save the updated user with the new cart items
    const updatedUser = await user.save();

    res.status(201).json({message: 'Product added to cart', product: updatedUser})
  } 
catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
}

export const clearCart = async  (req: AuthenticatedRequest, res: Response) => {
    try {
        const {id:userId} = req.user;
        const user = await getUserById(userId);
        
        if (!user) return res.status(401).json({ error: 'User not exist' });

        console.log(user.cart);

        // Clear the cart items array while preserving the type
        user.cart.splice(0, user.cart.length); 

        await user.save();
        return res.status(200).json({message: 'No item in the cart.'})
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
    
}

export const updateCart = async  (req: AuthenticatedRequest, res: Response) => {
    try {
        const cartItemId = req.params.id;
        const newQuantity = req.body.quantity;
        const {id} = req.user;
        const user = await getUserById(id);
        if (!user) return res.status(401).json({ error: 'User not exist' });

        if(newQuantity === 0){ // delete the cart item in the cart
            const cartItemIndex = user.cart.findIndex((item) => item._id.toString() === cartItemId);

            if (cartItemIndex === -1) return res.status(401).json({ error: 'Cart item not found' });
        
            // Remove the cart item from the cart array
            user.cart.splice(cartItemIndex, 1);
        
            // Save the updated user
            await user.save();
            return res.status(200).json({message: 'Successfully delete the item'})
        }else{ // quantity is incrementing or decrementing
            const cartItem = user.cart.find((item) => item._id.toString() === cartItemId);
            if (!cartItem) return res.status(401).json({ error: 'Cart item not found' });
            cartItem.quantity = newQuantity;
            return res.status(200).json(user)
        }

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}
export const deleteCartItem = async  (req: AuthenticatedRequest, res: Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}
