import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, Status } from "../../../types";
import axios from 'axios';

interface UserStateType {
    user: User | null,
    status: Status,
    token: string | null
    error: string | null
}

const initialState: UserStateType = {
    user: null,
    status: "idle",
    token: null,
    error: null
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk('user/registerUser', async (data: User): Promise<User | undefined> => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, data);
        localStorage.setItem('token', response.data.accessToken);
        return response.data;    
    } 
    catch (error) {
        console.error(error);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (data: User): Promise<User | undefined> => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        localStorage.setItem('token', response.data.accessToken);
        return response.data;    
    } 
    catch (error) {
        console.error(error);
    }
});

export const getUser = createAsyncThunk('user/getUser', async (token: string): Promise<User | undefined> => {
    try {
        const response = await axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } 
    catch (error) {
        
    }
});

export const userSlice = createSlice({
    initialState,
    name: "users",
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(registerUser.pending, (state) => {
            state.status = 'pending';
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = 'fulfilled',
                state.user = action.payload
            }
            state.error = null
        })
        .addCase(registerUser.rejected, (state) => {
            state.error = "Cannot register user",
            state.status = 'rejected'
        })
        .addCase(loginUser.pending, (state) => {
            state.status = 'pending';
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = 'fulfilled',
                state.user = action.payload
            }
            state.error = null
        })
        .addCase(loginUser.rejected, (state) => {
            state.error = "Cannot login user",
            state.status = 'rejected'
        })
    },
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;