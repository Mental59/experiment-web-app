import type { ExperimentRunType, TrackerType } from './experiment.type';

export type ExperimentRunInfoDto = {
  run_id: string;
  run_name: string;
  run_type: ExperimentRunType;
};

export type ExperimentProjectInfoDto = {
  project_id: string;
  project_name: string;
  runs: ExperimentRunInfoDto[];
};

export type ExperimentTrackerInfoDto = {
  tracker: TrackerType;
  projects: ExperimentProjectInfoDto[];
};
