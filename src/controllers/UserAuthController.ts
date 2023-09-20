require('dotenv').config()
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../service/usersService'
import { UserRole,UserType } from '../types/UserTypes';
const saltRounds = 10;
const jwtSecret = process.env.SERVER_TOKEN_SECRET;

 const signIn = async (req: express.Request, res: express.Response) => {

    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) return res.status(401).json({ error: 'User not exist' });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });
   
        const token = jwt.sign({ user: user }, jwtSecret, { expiresIn: '1h' });
        res.json({user: user, message: "successfully logged in", token });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
   
}

 const signUp = async (req: express.Request, res: express.Response) => {
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

export default {signIn, signUp}