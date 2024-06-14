import notifySlice from './../reducers/notify'
import authSlice from './../reducers/auth'
import userSlice from './../reducers/user'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        notify: notifySlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch