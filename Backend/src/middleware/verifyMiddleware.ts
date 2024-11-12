import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = localStorage.getItem("user_token");
        if(!token){
            res.status(403).json({message: "No token provided."})
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== 'object' && decoded === null){
            res.status(403).json({message: "Invalid token."})
            return;
        }
        res.status(200).json({message: "Valid token"});
        next();
    } 
    catch (error) {
        res.status(401).json(error);
    }
}