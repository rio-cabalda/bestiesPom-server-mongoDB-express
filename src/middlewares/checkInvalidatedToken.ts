require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import {InvalidateToken} from '../models/InvalidateTokenModel'
const jwtSecret = process.env.SERVER_TOKEN_SECRET;

const checkInvalidatedToken = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      
    try {
        // Check if the token is invalidated
        const isTokenInvalidated = await InvalidateToken.findOne({invalidatedTokens: token,});
        if (isTokenInvalidated) {
            return res.status(401).json({ error: 'Token has been invalidated' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

export default checkInvalidatedToken;