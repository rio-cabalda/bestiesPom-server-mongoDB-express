require('dotenv').config()
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getAdmin, createAdmin, getAdminByEmail } from '../service/adminService';
import { UserRole } from '../types/UserTypes';

const saltRounds = 10;
const jwtSecret = process.env.SERVER_TOKEN_SECRET;

const adminSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminByEmail(email);
    if (!admin) return res.status(401).json({ error: 'User not exist' });

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ admin: admin }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: "successfully logged in", token });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

 const adminSignUp = async (req: Request, res: Response) => {
  try {
    // Only one admin that is registered. 

    const { firstname, lastname, birthdate, email, password } = req.body;
    const existEmail = await getAdminByEmail(email);
    if(existEmail) return res.status(400).send({error:"Email already exist"});

    const existAdmin = await getAdmin();
    if(existAdmin.length > 0) return res.status(400).send({error:"There is already registered admin"});
    
     const hashedPassword = await bcrypt.hash(password, saltRounds);

     createAdmin({
      role: UserRole.ADMIN,
      firstname,
      lastname,
      email,
      birthdate,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default {adminSignUp, adminSignIn}