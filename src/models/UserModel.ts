import mongoose, { Schema } from 'mongoose';
import { UserType } from '../types/UserTypes';
import { CartItem } from '../types/UserTypes';

export const cartItemSchema = new Schema<CartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: Number,
});

const UserSchema: Schema = new Schema({
  role: { type: String, required: true },
  image: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema],
  
}, {timestamps: true});

const UserModel = mongoose.model<UserType>('User', UserSchema);


export default UserModel;
