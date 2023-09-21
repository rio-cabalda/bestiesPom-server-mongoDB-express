import express from 'express';
import authController from '../controllers/UserAuthController';
import validate from '../middlewares/validators/userValidation';
import adminController from '../controllers/AdminAuthController'
import { getAllUsers } from '../controllers/adminController';
import { addProducts } from '../controllers/productController';
import { adminAuthentication, userAuthentication } from '../middlewares/AuthMiddleware';


export default (router: express.Router) => {
    router.post('/user/register',validate.signUp, authController.signUp);
    router.post('/user/login',validate.signIn, authController.signIn);
    router.get('/user/auth', userAuthentication, authController.userData);
    // authentication for new user
   

    router.post('/admin/register',validate.signUp, adminController.adminSignUp);
    router.post('/admin/login',validate.signIn, adminController.adminSignIn);
    // authentication for new Administrator
    router.get('/admin/users',adminAuthentication, getAllUsers);
    // show all users if admin account is login
    
}
