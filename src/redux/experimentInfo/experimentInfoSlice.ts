import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExperimentMode } from '../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../models/experimentRunner/experimentTracker';
import { ExperimentMLModel } from '../../models/experimentRunner/experimentModel';

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
} = experimentApiInfoSlice.actions;
export const experimentInfoReducer = experimentApiInfoSlice.reducer;
