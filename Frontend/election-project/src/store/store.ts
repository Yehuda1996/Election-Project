import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/features/userSlice/userSlice";
import candidateReducer from '../store/features/candidateSlice/candidateSlice'


export const store = configureStore({
    reducer:{
        user: userReducer,
        candidate: candidateReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch