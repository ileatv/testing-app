//Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

//Redux
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

//AuthReducer
import authReducer from './auth/authReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;