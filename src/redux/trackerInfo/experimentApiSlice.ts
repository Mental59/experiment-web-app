import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ExperimentApiInfo = {
  datasets: string[];
};

const initialState: ExperimentApiInfo = {
  datasets: [],
};

export const experimentApiInfoSlice = createSlice({
  name: 'experimentApiInfo',
  initialState,
  reducers: {
    setDatasets: (state, action: PayloadAction<string[]>) => {
      const datasets = action.payload;
      state.datasets = datasets;
    },
  },
});

export const { setDatasets } = experimentApiInfoSlice.actions;
export const experimentApiInfoReducer = experimentApiInfoSlice.reducer;
