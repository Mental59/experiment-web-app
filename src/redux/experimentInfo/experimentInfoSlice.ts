import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExperimentMode } from '../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../models/experimentRunner/experimentTracker';

export type ExperimentInfo = {
  mode: ExperimentMode;
  tracker: ExperimentTracker;
  trainRunId: string | null;
};

const initialState: ExperimentInfo = {
  mode: ExperimentMode.Train,
  tracker: ExperimentTracker.Neptune,
  trainRunId: null,
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
  },
});

export const { setExperimentMode, setExperimentTracker, setTrainRunId } =
  experimentApiInfoSlice.actions;
export const experimentInfoReducer = experimentApiInfoSlice.reducer;
