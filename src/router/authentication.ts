import express from 'express';
import authController from '../controllers/UserAuthController';
import validate from '../middlewares/validators/userValidation';
import adminController from '../controllers/AdminAuthController'
import { getAllUsers } from '../controllers/adminController';
import { addProducts } from '../controllers/productController';
import { adminAuthentication, userAuthentication } from '../middlewares/AuthMiddleware';
import checkInvalidatedToken from '../middlewares/checkInvalidatedToken';

export default (router: express.Router) => {
    router.post('/user/register',validate.signUp, authController.signUp);
    // authentication for new user
    router.post('/user/login',validate.signIn, authController.signIn);
    // log in user
    router.post('/user/logout', authController.logout);
    //log out user

    router.get('/user/auth', checkInvalidatedToken, userAuthentication, authController.userData);
    // get the logged in user
   

    router.post('/admin/register',validate.signUp, adminController.adminSignUp);
    router.post('/admin/login',validate.signIn, adminController.adminSignIn);
    // authentication for new Administrator
    router.get('/admin/users',adminAuthentication, getAllUsers);
    // show all users if admin account is login
    
}
