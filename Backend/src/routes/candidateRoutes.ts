import express from "express";
import { getAllCandidates } from "../controllers/candidateController";

const router = express.Router();

router.get('/candidates', getAllCandidates);

export default router;