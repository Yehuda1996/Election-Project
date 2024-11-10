import { Request, Response } from "express";
import CandidateModel from "../models/CandidateModel";

export const getAllCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await CandidateModel.find();
        res.status(200).json(candidates)
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve candidates" }); 
    }
}
