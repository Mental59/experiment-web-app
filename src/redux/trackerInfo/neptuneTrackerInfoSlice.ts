import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  ExperimentTrackerInfoDto,
  ExperimentProjectInfoDto,
} from '../../models/experimentTrackers/experimentTrackerInfo.type';
import { RunOutputDto } from '../../models/experiment/run.type';
import { ExperimentRunTypeDto } from '../../models/experimentTrackers/experiment.type';

export type NeptuneExperimentTrackerInfo = ExperimentTrackerInfoDto & {
  apiToken: string;
  correctApiToken: boolean;
  projectsLoaded: boolean;
};

const initialState: NeptuneExperimentTrackerInfo = {
  tracker: 'neptune',
  correctApiToken: false,
  projectsLoaded: false,
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
    setNeptuneCorrectApiToken: (state, action: PayloadAction<boolean>) => {
      const correctApiToken = action.payload;
      state.correctApiToken = correctApiToken;
    },
    setNeptuneProjectsLoaded: (state, action: PayloadAction<boolean>) => {
      const projectsLoaded = action.payload;
      state.projectsLoaded = projectsLoaded;
    },
    addNeptuneRun: (
      state,
      action: PayloadAction<RunOutputDto & { run_type: ExperimentRunTypeDto }>
    ) => {
      const runOutput = action.payload;

      const project = state.projects.find(
        (_project) => _project.project_id === runOutput.project_id
      );

      if (project) {
        project.runs = [
          ...project.runs,
          { run_id: runOutput.run_id, run_name: runOutput.run_name, run_type: runOutput.run_type },
        ];
      }
    },
  },
});

export const {
  setNeptuneProjects,
  addNeptuneProject,
  setNeptuneApiKey,
  setNeptuneCorrectApiToken,
  setNeptuneProjectsLoaded,
  addNeptuneRun,
} = neptuneTrackerInfoSlice.actions;
export const neptuneTrackerInfoReducer = neptuneTrackerInfoSlice.reducer;
