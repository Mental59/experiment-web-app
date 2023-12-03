import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  ExperimentTrackerInfoDto,
  ExperimentProjectInfoDto,
} from '../../models/experimentTrackers/experimentTrackerInfo.type';

export type NeptuneExperimentTrackerInfo = ExperimentTrackerInfoDto & {
  apiToken: string;
  correctApiToken: boolean;
  currentProjectId: string | null;
};

const initialState: NeptuneExperimentTrackerInfo = {
  tracker: 'neptune',
  correctApiToken: true,
  currentProjectId: '',
  apiToken: '',
  projects: [],
};

export const neptuneTrackerInfoSlice = createSlice({
  name: 'neptuneTrackerInfo',
  initialState,
  reducers: {
    setNeptuneProjects: (state, action: PayloadAction<ExperimentProjectInfoDto[]>) => {
      const projects = action.payload;
      state.projects = projects;
    },
    addNeptuneProject: (state, action: PayloadAction<ExperimentProjectInfoDto>) => {
      const project = action.payload;
      state.projects = [...state.projects, project];
    },
    setNeptuneApiKey: (state, action: PayloadAction<string>) => {
      const apiKey = action.payload;
      state.apiToken = apiKey;
    },
    setNeptuneCurrentProjectId: (state, action: PayloadAction<string | null>) => {
      const projectId = action.payload;
      state.currentProjectId = projectId;
    },
    setNeptuneCorrectApiToken: (state, action: PayloadAction<boolean>) => {
      const correctApiToken = action.payload;
      state.correctApiToken = correctApiToken;
    },
  },
});

export const {
  setNeptuneProjects,
  addNeptuneProject,
  setNeptuneApiKey,
  setNeptuneCurrentProjectId,
  setNeptuneCorrectApiToken,
} = neptuneTrackerInfoSlice.actions;
export const neptuneTrackerInfoReducer = neptuneTrackerInfoSlice.reducer;
