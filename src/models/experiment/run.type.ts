export type MLModelDto = 'LSTM_CRF' | 'CRF' | 'BERT' | 'LSTM';

export type BiLSTMCRFRunTrainingInputDto = {
  dataset: string;
  run_name: string;
  base_experiment_id: string | null;
  experiment_tracker: 'neptune' | 'mlflow';

  model_params: {
    embedding_dim: number;
    hidden_dim: number;
  };

  train_params: {
    batch_size: number;
    num_epochs: number;
    learning_rate: number;
    scheduler_factor: number;
    scheduler_patience: number;
    weight_decay: number;
    case_sensitive: boolean;
    test_size: number;
    num2words: boolean;
  };
};

export type BiLSTMCRFRunTestingInputDto = {
  dataset: string;
  run_name: string;
  train_run_id: string;
  base_experiment_id: string | null;
  experiment_tracker: 'neptune' | 'mlflow';
};

export type RunOutputDto = {
  experiment_tracker: 'neptune' | 'mlflow';
  run_id: string;
  run_name: string;
  project_id: string;
  url?: string;
};
