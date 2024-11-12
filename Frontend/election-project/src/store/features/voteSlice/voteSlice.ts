import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Types } from "mongoose";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface VoteStateType {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    loading: boolean
    successMessage: string | null;
    error: string | null;
}

interface VotePayload {
    userId: Types.ObjectId | string;
    candidateId: Types.ObjectId | string | null;  
}

const initialState: VoteStateType = {
    status: 'idle',
    loading: false,
    successMessage: null,
    error: null,
};

export const castVote = createAsyncThunk(
    'vote/castVote',
    async ({ userId, candidateId }: VotePayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/vote`, { userId, candidateId });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to cast vote");
        }
    }
);

const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
        resetVoteState: (state) => {
            state.status = 'idle';
            state.successMessage = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(castVote.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.successMessage = null;
            })
            .addCase(castVote.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.successMessage = action.payload?.message || "Vote cast successfully!";
                state.error = null;
            })
            .addCase(castVote.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
                state.successMessage = null;
            });
    },
});


export const { resetVoteState } = voteSlice.actions;
export const selectVoteState = (state: { vote: VoteStateType }) => state.vote;
export default voteSlice.reducer;
