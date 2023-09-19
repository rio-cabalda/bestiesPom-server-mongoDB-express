import ProductModel from '../models/ProductModel';

// Assuming you've defined the Product and User models


export const createProduct = (values: Record<string,any>) => new ProductModel(values).save().then((product)=> product.toObject());

export const getProducts = () => ProductModel.find();

export const getProductById = (id: string) => ProductModel.findById(id);

