import mongoose,{Schema} from "mongoose";
import {Request} from 'express';
import { ProductType } from "../types/UserTypes";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
},{timestamps: true});

const ProductModel = mongoose.model<ProductType>('Product', ProductSchema);

export default ProductModel;