import type { ExperimentRunTypeDto, ExperimentTrackerDto } from './experiment.type';

export type ExperimentRunInfoDto = {
  run_id: string;
  run_name: string;
  run_type: ExperimentRunTypeDto;
};

export type ExperimentProjectInfoDto = {
  project_id: string;
  project_name: string;
  runs: ExperimentRunInfoDto[];
};

export type ExperimentTrackerInfoDto = {
  tracker: ExperimentTrackerDto;
  projects: ExperimentProjectInfoDto[];
};
