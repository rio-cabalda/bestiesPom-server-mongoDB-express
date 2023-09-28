require('dotenv').config()
import {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../service/usersService';
import { getAdminById } from '../service/adminService';
import {AuthenticatedRequest, UserType} from '../types/UserTypes';

const jwtSecret = process.env.SERVER_TOKEN_SECRET;

export const userAuthentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }
  try {
     const {user} = jwt.verify(token, jwtSecret) as { user: UserType};
   
     const verifiedUser = await getUserById(user._id)

  if(!verifiedUser) return res.status(403).json({message: 'Invalid user'})

    req.user = verifiedUser; // Attach the user to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const adminAuthentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }
  try {
     const { admin } = jwt.verify(token, jwtSecret) as { admin: UserType };

     const verifiedAdmin = await getAdminById(admin._id);
     
    console.log(verifiedAdmin);
    
    if(!verifiedAdmin) return res.status(403).json({message: 'Invalid administrator'})

     req.admin = verifiedAdmin; // Attach the user to the request object
     next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};