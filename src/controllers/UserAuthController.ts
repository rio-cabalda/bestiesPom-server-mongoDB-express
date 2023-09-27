require('dotenv').config()
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getUserById } from '../service/usersService'
import { AuthenticatedRequest, UserRole } from '../types/UserTypes';
const cookieParser = require('cookie-parser');

const saltRounds = 10;
const jwtSecret = process.env.SERVER_TOKEN_SECRET;

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

const logout = (req:Request, res:Response) => {
  res.clearCookie('jwt'); // Clear the JWT cookie
  res.json({ message: 'Logged out successfully' });
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