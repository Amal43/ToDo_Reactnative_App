import {configureStore ,Store} from '@reduxjs/toolkit';
import authSlice from './Slices/AuthSlice';
import TodoSlice from './Slices/TodoSlice';


export const store:Store = configureStore({
        reducer:{
                auth: authSlice,
                todo: TodoSlice
        },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;