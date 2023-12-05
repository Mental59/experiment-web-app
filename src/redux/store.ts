import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { webAppStateReducer } from './webAppState/webAppStateSlice';
import { mlflowTrackerInfoReducer } from './trackerInfo/mlflowTrackerInfoSlice';
import { neptuneTrackerInfoReducer } from './trackerInfo/neptuneTrackerInfoSlice';
import { experimentApiInfoReducer } from './trackerInfo/experimentApiSlice';
import { experimentInfoReducer } from './experimentInfo/experimentInfoSlice';

export const store = configureStore({
  reducer: {
    webAppState: webAppStateReducer,
    mlflowTrackerInfo: mlflowTrackerInfoReducer,
    neptuneTrackerInfo: neptuneTrackerInfoReducer,
    experimentApiInfo: experimentApiInfoReducer,
    experimentInfo: experimentInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
