import express from "express";
import { handleVote } from "../controllers/voteController";
import { verifyToken } from "../middleware/verifyMiddleware";


const router = express.Router();

router.put('/vote', verifyToken, handleVote);

export default router;