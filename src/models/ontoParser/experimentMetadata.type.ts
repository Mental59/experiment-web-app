export type ExperimentAuthorDto = {
  id: string;
  login: string;
};

export type ExperimentMetricsDto = {
  accuracy: number;
  confidence: number;
  f1_weighted: number;
  precision_weighted: number;
  recall_weighted: number;
};

export type ExperimentParametersDto = {
  batch_size: number;
  case_sensitive: boolean;
  dataset: string;
  device: string;
  embedding_dim: number;
  experiment_mode: 'train' | 'test';
  hidden_dim: number;
  learning_rate: number;
  model_name: string;
  num2words: boolean;
  num_epochs: number;
  scheduler_factor: number;
  scheduler_patience: number;
  test_size: number;
  weight_decay: number;
  train_run_id: string;
  unknown_labels: boolean;
};

export type ExperimentTrackerInfoDto = {
  experiment_tracker: 'mlflow' | 'neptune';
  project_id: string;
  run_id: string;
  run_name: string;
  url?: string;
};

export type ExperimentMetadataDto = {
  author: ExperimentAuthorDto;
  metrics: ExperimentMetricsDto;
  parameters: ExperimentParametersDto;
  time: string;
  tracker_info: ExperimentTrackerInfoDto;
};
