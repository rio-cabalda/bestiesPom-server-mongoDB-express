import { body } from 'express-validator';
import validateRequest from './validate';

const signIn = [ 
  body('email').isEmail(),
  body('password').notEmpty(),
  validateRequest]
const signUp = [
  body('firstname').notEmpty(),
  body('lastname').notEmpty(),
  body('birthdate').notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character (@, $, !, %,*, ?, &)'),
    validateRequest
]
const quantity = [
  body('quantity')
  .isInt({ min: 1 })
  .withMessage('Quantity must be greater than zero'),
  validateRequest
]

const validators = {
  signIn: signIn,
  signUp: signUp,
  quantity: quantity
}

export default validators;


