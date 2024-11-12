import {Types} from "mongoose"

export interface VoteDto {
    userId: Types.ObjectId | string,
    candidateId: Types.ObjectId | string
}