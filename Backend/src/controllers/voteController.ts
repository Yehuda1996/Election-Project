import { Request, Response } from "express";
import CandidateModel from "../models/CandidateModel";
import UserModel from "../models/UserModel";


export const handleVote = async (req: Request, res: Response) => {
    try {
        const {userId, candidateId} = req.body;
        await CandidateModel.findByIdAndUpdate(candidateId, {
            $inc: {
                votes: 1
            }
        });
        await UserModel.findByIdAndUpdate(userId, {
            $inc: {
                hasVoted: true,
                votedFor: candidateId
            }
        });
        res.status(200).json({message: "Voting complete!"})
        return;
    } 
    catch (error) {
        res.status(500).json(error);
        return;
    }
}