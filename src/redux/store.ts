import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { experimentMenuSectionReducer } from './experimentsMenuSection/experimentsMenuSectionSlice';

export const store = configureStore({
  reducer: {
    experimentMenuSection: experimentMenuSectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
