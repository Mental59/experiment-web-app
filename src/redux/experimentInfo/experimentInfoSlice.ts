import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExperimentMode } from '../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../models/experimentRunner/experimentTracker';
import { ExperimentMLModel } from '../../models/experimentRunner/experimentModel';
import { ExperimentMetadataDto } from '../../models/ontoParser/experimentMetadata.type';

export type ExperimentInfo = {
  dataset: string | null;
  runName: string | null;
  project: string | null;
  mode: ExperimentMode;
  tracker: ExperimentTracker;
  trainRunId: string | null;
  model: ExperimentMLModel;
  embeddingDim: number;
  hiddenDim: number;
  batchSize: number;
  numEpochs: number;
  learningRate: number;
  schedulerFactor: number;
  schedulerPatience: number;
  weightDecay: number;
  caseSensitive: boolean;
  testSize: number;
  num2words: boolean;
  allowedModels: ExperimentMLModel[];
  baseExperimentId: string | null;
};

const initialState: ExperimentInfo = {
  dataset: null,
  runName: null,
  project: null,
  mode: ExperimentMode.Train,
  tracker: ExperimentTracker.Neptune,
  trainRunId: null,
  model: ExperimentMLModel.LSTM_CRF,
  embeddingDim: 64,
  hiddenDim: 64,
  batchSize: 2048,
  numEpochs: 40,
  learningRate: 1e-2,
  schedulerFactor: 1e-1,
  schedulerPatience: 10,
  weightDecay: 1e-4,
  caseSensitive: false,
  testSize: 0.2,
  num2words: true,
  allowedModels: [],
  baseExperimentId: null,
};

export const experimentApiInfoSlice = createSlice({
  name: 'experimentInfo',
  initialState,
  reducers: {
    setExperimentMode: (state, action: PayloadAction<ExperimentMode>) => {
      const experimentMode = action.payload;
      state.mode = experimentMode;
    },
    setExperimentTracker: (state, action: PayloadAction<ExperimentTracker>) => {
      const tracker = action.payload;
      state.tracker = tracker;
    },
    setTrainRunId: (state, action: PayloadAction<string | null>) => {
      const runId = action.payload;
      state.trainRunId = runId;
    },
    setExperimentMLModel: (state, action: PayloadAction<ExperimentMLModel>) => {
      const model = action.payload;
      state.model = model;
    },
    setEmbeddingDim: (state, action: PayloadAction<number>) => {
      const embeddingDim = action.payload;
      state.embeddingDim = embeddingDim;
    },
    setHiddenDim: (state, action: PayloadAction<number>) => {
      const hiddenDim = action.payload;
      state.hiddenDim = hiddenDim;
    },
    setBatchSize: (state, action: PayloadAction<number>) => {
      const batchSize = action.payload;
      state.batchSize = batchSize;
    },
    setNumEpochs: (state, action: PayloadAction<number>) => {
      const numEpochs = action.payload;
      state.numEpochs = numEpochs;
    },
    setLearningRate: (state, action: PayloadAction<number>) => {
      const learningRate = action.payload;
      state.learningRate = learningRate;
    },
    setSchedulerFactor: (state, action: PayloadAction<number>) => {
      const schedulerFactor = action.payload;
      state.schedulerFactor = schedulerFactor;
    },
    setSchedulerPatience: (state, action: PayloadAction<number>) => {
      const schedulerPatience = action.payload;
      state.schedulerPatience = schedulerPatience;
    },
    setWeightDecay: (state, action: PayloadAction<number>) => {
      const weightDecay = action.payload;
      state.weightDecay = weightDecay;
    },
    setCaseSensitive: (state, action: PayloadAction<boolean>) => {
      const caseSensitive = action.payload;
      state.caseSensitive = caseSensitive;
    },
    setTestSize: (state, action: PayloadAction<number>) => {
      const testSize = action.payload;
      state.testSize = testSize;
    },
    setNum2words: (state, action: PayloadAction<boolean>) => {
      const num2words = action.payload;
      state.num2words = num2words;
    },
    setExperimentDataset: (state, action: PayloadAction<string | null>) => {
      const dataset = action.payload;
      state.dataset = dataset;
    },
    setExperimentRunName: (state, action: PayloadAction<string | null>) => {
      const runName = action.payload;
      state.runName = runName;
    },
    setExperimentProject: (state, action: PayloadAction<string | null>) => {
      const project = action.payload;
      state.project = project;
    },
    setAllowedExperimentModels: (state, action: PayloadAction<ExperimentMLModel[]>) => {
      const models = action.payload;
      state.allowedModels = models;
    },
    setExperimentParameters: (state, action: PayloadAction<ExperimentMetadataDto>) => {
      const metadata = action.payload;
      state.batchSize = metadata.parameters.batch_size;
      state.caseSensitive = metadata.parameters.case_sensitive;
      state.dataset = metadata.parameters.dataset;
      state.embeddingDim = metadata.parameters.embedding_dim;
      state.hiddenDim = metadata.parameters.hidden_dim;
      state.learningRate = metadata.parameters.learning_rate;
      state.mode =
        metadata.parameters.experiment_mode === 'train'
          ? ExperimentMode.Train
          : ExperimentMode.Test;
      state.model = metadata.parameters.model_name as ExperimentMLModel;
      state.num2words = metadata.parameters.num2words;
      state.numEpochs = metadata.parameters.num_epochs;
      state.project = null;
      state.runName = null;
      state.schedulerFactor = metadata.parameters.scheduler_factor;
      state.schedulerPatience = metadata.parameters.scheduler_patience;
      state.testSize = metadata.parameters.test_size;
      state.tracker =
        metadata.tracker_info.experiment_tracker === 'mlflow'
          ? ExperimentTracker.MLflow
          : ExperimentTracker.Neptune;
      state.trainRunId = metadata.parameters.train_run_id ?? null;
      state.weightDecay = metadata.parameters.weight_decay;
    },
    setBaseExperimentId: (state, action: PayloadAction<string | null>) => {
      const experimentId = action.payload;
      state.baseExperimentId = experimentId;
    },
  },
});

export const {
  setExperimentMode,
  setExperimentTracker,
  setTrainRunId,
  setExperimentMLModel,
  setBatchSize,
  setCaseSensitive,
  setEmbeddingDim,
  setHiddenDim,
  setLearningRate,
  setNum2words,
  setNumEpochs,
  setSchedulerFactor,
  setSchedulerPatience,
  setTestSize,
  setWeightDecay,
  setExperimentDataset,
  setExperimentRunName,
  setExperimentProject,
  setAllowedExperimentModels,
  setExperimentParameters,
  setBaseExperimentId,
} = experimentApiInfoSlice.actions;
export const experimentInfoReducer = experimentApiInfoSlice.reducer;
