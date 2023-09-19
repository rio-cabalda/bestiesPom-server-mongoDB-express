import {Request, Response} from 'express';
import { AuthenticatedRequest } from '../types/UserTypes';
import { deleteUserById, getUserById, getUsers } from '../service/usersService';
import { getAdmin } from '../service/adminService';


export const showAdmin = async (req: Request, res: Response) => {
  try {
      const admins = await getAdmin();
      return res.status(200).json(admins);
  } catch (error) {
      console.log(error);
      return res.sendStatus(400);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {

  // try {
  //    const { id } = req.params;
  //    const user = await getUserById(id);
    
  //   if(!user) return res.status(403).json({ error: 'Invalid user' });
  //   if (req.user.id !== req.params.id) 
  //      return res.status(403).json({ error: 'Unauthorized: You are not allowed to delete this account' });
     
  //     const deletedUser = await deleteUserById(id);
  //     if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    
  //   res.json({ message: 'User deleted successfully' });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: 'An error occurred' });
  // }
}

export const updateUser = async (req:AuthenticatedRequest, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const { username } = req.body;
    
  //   const user = await getUserById(id);
  //   if(!username || !id) return res.status(403).send('Missing ID or Username');
  //   if (!user) return res.status(403).json({ error: 'Invalid user' });
  //   if (req.user.id !== req.params.id) 
  //   return res.status(403).json({ error: 'Unauthorized: You are not allowed to Update this account' });
  //   if (req.user.username === username) return res.status(403).json({ error: 'The same value of username' });

  //   user.username = username;
  //   await user.save();
  //   res.json({ message: 'User updated successfully'});    
  // } catch (error) {
  //   console.log(error);
  //   return res.sendStatus(400);
  // }
}