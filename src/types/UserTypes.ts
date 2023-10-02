import mongoose, { Document, Schema, Types } from 'mongoose';
import {Request} from 'express';
import ProductModel from '../models/ProductModel';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

export type ProductType = Document & {
  name:  string;
  price: number;
  image: string;
  stock: number;
  description: string;
  category: string;
  rating: number;
}


export type CartItem = Document & {
  product: Types.ObjectId | ProductType;
  quantity: number;
}

export type UserType = Document & {
  role: string;
  image: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  password: string;
  cart:  Types.Array<CartItem>;
}

export type AdminType = Document & {
  role: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  password: string;
}

export type InvalidateTokenType = Document &{
  invalidatedTokens:string[];
}

export type AuthenticatedRequest = Request & {
  user: UserType;
  admin: AdminType;
  userId: string;
}
  
