import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { webAppStateReducer } from './webAppState/webAppStateSlice';
import { mlflowTrackerInfoReducer } from './trackerInfo/mlflowTrackerInfoSlice';
import { neptuneTrackerInfoReducer } from './trackerInfo/neptuneTrackerInfoSlice';

export const store = configureStore({
  reducer: {
    webAppState: webAppStateReducer,
    mlflowTrackerInfo: mlflowTrackerInfoReducer,
    neptuneTrackerInfo: neptuneTrackerInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
