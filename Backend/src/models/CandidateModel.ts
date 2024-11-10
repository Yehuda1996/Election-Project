import mongoose, { Schema } from "mongoose";

export interface ICandidate extends Document {
    name: string,
    image: string,
    votes: number
}

const CandidateSchema = new Schema<ICandidate>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    image: {
        type: String
    },
    votes: {
        type: Number
    }
})

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);