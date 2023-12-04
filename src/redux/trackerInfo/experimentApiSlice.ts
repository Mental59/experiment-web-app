import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ExperimentApiInfoDto = {
  datasets: string[];
};

const initialState: ExperimentApiInfoDto = {
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
