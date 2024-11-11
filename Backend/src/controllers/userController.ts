import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const register = async (req: Request, res: Response) => {
    try {
        const {username, password, isAdmin} = req.body;
        if (!username || !password){
            res.status(400).json("Both fields are required")
            return;
        }
        
        const existingUser = await UserModel.findOne({username});
        if(existingUser) {
            res.status(400).json("This username is already in use")
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel(
            {
                username,
                password: hashedPassword,
                isAdmin: false,
                hasVoted: false,
                votedFor: null
            }
        );
        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser})
        return;
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
        return;
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).json("Username and password are required") 
            return
        }

        const user = await UserModel.findOne({username});
        if (!user) {
            res.status(400).json("No user found by that username")
            return
        }
        else{
            const passwordValidity = await bcrypt.compare(password, user.password);
            if(!passwordValidity){
                res.status(400).json({message: 'Invalid password'});
                return
            }
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({message: "Login successful", token})
        return;
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
        return;
    }
};