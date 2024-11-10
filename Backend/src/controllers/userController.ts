import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';


export const register = async (req: Request, res: Response) => {
    try {
        const {username, password, isAdmin} = req.body;
        if (!username || !password){
            res.status(400).json("Both fields are required")
        }
        
        const existingUser = await UserModel.findOne({username});
        if(existingUser) {
            res.status(400).json("This username is already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel(
            {
                username,
                password,
                isAdmin: false,
                hasVoted: false,
                votedFor: null
            }
        );
        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser})
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).json("Username and password are required")
        }

        const user = await UserModel.findOne({username});
        if (!user) {
            res.status(400).json("No user found by that username")
        }
        else{
            const passwordValidity = await bcrypt.compare(password, user.password);
            if(!passwordValidity){
                res.status(400).json({message: 'Invalid password'});
            }
        }

        res.status(200).json("Login successful")
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};