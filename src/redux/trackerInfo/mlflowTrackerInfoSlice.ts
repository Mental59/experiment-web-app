import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  ExperimentTrackerInfoDto,
  ExperimentProjectInfoDto,
} from '../../models/experimentTrackers/experimentTrackerInfo.type';
import type { RunOutputDto } from '../../models/experiment/run.type';
import { ExperimentRunType } from '../../models/experimentTrackers/experiment.type';

export type MLflowExperimentTrackerInfo = ExperimentTrackerInfoDto & {
  projectsLoaded: boolean;
};

const initialState: MLflowExperimentTrackerInfo = {
  tracker: 'mlflow',
  projectsLoaded: false,
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
    setMLflowProjectsLoaded: (state, action: PayloadAction<boolean>) => {
      const projectsLoaded = action.payload;
      state.projectsLoaded = projectsLoaded;
    },
    addMLflowRun: (
      state,
      action: PayloadAction<RunOutputDto & { run_type: ExperimentRunType }>
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

export const { setMLflowProjects, addMLflowProject, addMLflowRun, setMLflowProjectsLoaded } =
  mlflowTrackerInfoSlice.actions;
export const mlflowTrackerInfoReducer = mlflowTrackerInfoSlice.reducer;
