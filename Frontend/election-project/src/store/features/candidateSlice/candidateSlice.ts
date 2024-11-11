import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Candidate, Status, RootState } from "../../../types";
import axios from 'axios';

interface CandidateStateType {
    candidates: Candidate[],
    status: Status,
    error: string | null
}

const initialState: CandidateStateType = {
    candidates: [],
    status: 'idle',
    error: null
}

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async (): Promise<Candidate[] | undefined> => {
    try {
        const response = await axios.get(`${BASE_URL}/candidates`);
        return response.data;   
    } 
    catch (error) {
        console.error(error);
    }
});

export const candidateSlice = createSlice({
    initialState,
    name: "candidates",
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCandidates.pending, (state) => {
            state.status = 'pending',
            state.error = null
        })
        .addCase(fetchCandidates.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = 'fulfilled',
                state.candidates = action.payload
            }
            state.error = null
        })
        .addCase(fetchCandidates.rejected, (state) => {
            state.error = "Cannot fetch candidates",
            state.status = 'rejected'
        })
    }
}) 

export const selectAllCandidates = (state: RootState): Candidate[] => state.candidates;

export default candidateSlice.reducer;