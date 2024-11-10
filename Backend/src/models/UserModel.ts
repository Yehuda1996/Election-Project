import mongoose, { Schema, Types } from "mongoose";
import { ICandidate } from "./CandidateModel";

export interface IUser extends Document {
    username: string,
    password: string,
    isAdmin: boolean,
    hasVoted: boolean,
    votedFor: ICandidate | null
} 

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
    },
    isAdmin: {
        type: Boolean
    },
    hasVoted: {
        type: Boolean
    },
    votedFor: {
        type: Types.ObjectId,
        ref: "Candidate"
    }
})

export default mongoose.model<IUser>("User", UserSchema);