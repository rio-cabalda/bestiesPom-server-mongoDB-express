import mongoose, { Schema } from 'mongoose';
import { AdminType } from '../types/UserTypes';


const UserSchema: Schema = new Schema({
  role: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},{timestamps: true});
const AdminModel = mongoose.model<AdminType>('Admin', UserSchema);

export default AdminModel;
