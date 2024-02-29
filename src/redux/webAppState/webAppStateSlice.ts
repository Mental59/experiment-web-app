import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ExperimentActiveSection } from '../../models/experiment/section.type';

export type WebAppState = {
  activeSection: ExperimentActiveSection;
  settingsLoading: boolean;
  datasetsLoading: boolean;
  sourceCodeLoading: boolean;
  datasetsLoaded: boolean;
};

const initialState: WebAppState = {
  activeSection: 'ExperimentsSection',
  settingsLoading: false,
  datasetsLoading: false,
  datasetsLoaded: false,
  sourceCodeLoading: false,
};

export const webAppStateSlice = createSlice({
  name: 'webAppState',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ExperimentActiveSection>) => {
      const activeSection = action.payload;
      state.activeSection = activeSection;
    },
    setSettingsLoading: (state, action: PayloadAction<boolean>) => {
      const settingsLoading = action.payload;
      state.settingsLoading = settingsLoading;
    },
    setDatasetsLoading: (state, action: PayloadAction<boolean>) => {
      const datasetsLoading = action.payload;
      state.datasetsLoading = datasetsLoading;
    },
    setDatasetsLoaded: (state, action: PayloadAction<boolean>) => {
      const datasetsLoaded = action.payload;
      state.datasetsLoaded = datasetsLoaded;
    },
    setSourceCodeLoading: (state, action: PayloadAction<boolean>) => {
      const sourceCodeLoading = action.payload;
      state.sourceCodeLoading = sourceCodeLoading;
    },
  },
});

export const {
  setActiveSection,
  setSettingsLoading,
  setDatasetsLoading,
  setDatasetsLoaded,
  setSourceCodeLoading,
} = webAppStateSlice.actions;
export const webAppStateReducer = webAppStateSlice.reducer;
