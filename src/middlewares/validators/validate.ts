import {validationResult} from 'express-validator';
import { Request,Response, NextFunction } from 'express';

const validateRequest = (req: Request, res: Response, next:NextFunction)=>{

    const validationError = validationResult(req);
    
    if(!validationError.isEmpty()) return res.status(400).json(validationError.array());

    return next();
}

export default validateRequest;