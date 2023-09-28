require('dotenv').config()
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getUserById } from '../service/usersService'
import { AuthenticatedRequest, UserRole,InvalidateTokenType } from '../types/UserTypes';
import { InvalidateToken  } from '../models/InvalidateTokenModel';
const cookieParser = require('cookie-parser');

const saltRounds = 10;
const jwtSecret = process.env.SERVER_TOKEN_SECRET;
const invalidatedTokens: string[] = [];

 const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) return res.status(401).json({ error: 'User not exist' });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });

        const accessToken = jwt.sign({ user: user }, jwtSecret, { expiresIn: '7d' }); // Expires in 7days (testing purposes)
        // const accessToken = jwt.sign({ user: user }, jwtSecret, { expiresIn: '1h' });

        res.cookie('jwt', accessToken, { httpOnly: true }); // Set the JWT token as a cookie
  
        res.json({message: "successfully logged in", accessToken });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
   
}

const logout = async (req:Request, res:Response) => {
  try {
      // Get the access token from the request (you can extract it from headers, cookies, etc.)
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }
     // Find the InvalidToken document in the database or create it if it doesn't exist
     let invalidTokenDocument: InvalidateTokenType | null = await InvalidateToken.findOne();
      if (!invalidTokenDocument) {
        invalidTokenDocument = await InvalidateToken.create({ invalidatedTokens: [] });
      }
      // Check if the token is already in the invalidatedTokens array
      if (!invalidTokenDocument.invalidatedTokens.includes(token)) {
        // If it's not in the array, add it
        invalidTokenDocument.invalidatedTokens.push(token);

        // Save the document
        await invalidTokenDocument.save();
      }

     // Save the document
    await invalidTokenDocument.save();

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


 const signUp = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, birthdate, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existUser = await getUserByEmail(email);
    if(existUser) return res.status(400).send({"error":"Email already exist"});

    createUser({
      role: UserRole.USER,
      firstname,
      lastname,
      email,
      birthdate,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
const userData = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const {id} = req.user;
      const user = await getUserById(id);
      if (!user) return res.status(401).json({ error: 'User not exist' });
      const responseUser = {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        cart: user.cart
      }
      return res.status(200).json({user:responseUser});
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
    
}

export default {signIn, logout, signUp, userData};