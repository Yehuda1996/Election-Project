import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/features/userSlice/userSlice";
import candidateReducer from '../store/features/candidateSlice/candidateSlice'
import voteReducer from '../store/features/voteSlice/voteSlice'


export const store = configureStore({
    reducer:{
        user: userReducer,
        candidate: candidateReducer,
        vote: voteReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch