import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  ExperimentTrackerInfoDto,
  ExperimentProjectInfoDto,
} from '../../models/experimentTrackers/experimentTrackerInfo.type';

const initialState: ExperimentTrackerInfoDto = {
  tracker: 'mlflow',
  projects: [],
};

export const mlflowTrackerInfoSlice = createSlice({
  name: 'mlflowTrackerInfo',
  initialState,
  reducers: {
    setMLflowProjects: (state, action: PayloadAction<ExperimentProjectInfoDto[]>) => {
      const projects = action.payload;
      state.projects = projects;
    },
    addMLflowProject: (state, action: PayloadAction<ExperimentProjectInfoDto>) => {
      const project = action.payload;
      state.projects = [...state.projects, project];
    },
  },
});

export const { setMLflowProjects, addMLflowProject } = mlflowTrackerInfoSlice.actions;
export const mlflowTrackerInfoReducer = mlflowTrackerInfoSlice.reducer;
