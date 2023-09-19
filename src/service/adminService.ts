import AdminModel from '../models/AdminModel';

export const getAdmin = () => AdminModel.find();

export const getAdminByEmail = (email: string) => AdminModel.findOne({email}); 

export const getAdminById = (id: string) => AdminModel.findById(id);

export const createAdmin = (values: Record<string,any>) => new AdminModel(values).save().then((admin)=> admin.toObject());