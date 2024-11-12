import { Request, Response } from "express";
import CandidateModel from "../models/CandidateModel";
import UserModel from "../models/UserModel";
import { VoteDto } from "../dto/voteDto";

export const handleVote = async (req: Request, res: Response) => {
    try {
        const { userId, candidateId }: VoteDto = req.body;

        const user = await UserModel.findById(userId);
        const candidate = await CandidateModel.findById(candidateId);
        if (!user){
            res.status(404).json({ message: "User not found" });
            return;
        }  

        if (user.hasVoted && user.votedFor !== candidate) {
            await CandidateModel.findByIdAndUpdate(user.votedFor, {
                $inc: { votes: -1 },
            });
        }

        await CandidateModel.findByIdAndUpdate(candidateId, {
            $inc: { votes: 1 },
        });

        await UserModel.findByIdAndUpdate(userId, {
            hasVoted: true,
            votedFor: candidateId,
        });

        res.status(200).json({ message: "Vote updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Voting failed", details: error });
    }
};
