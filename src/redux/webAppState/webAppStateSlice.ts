import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ExperimentActiveSection } from '../../models/experiment/section.type';

export type WebAppState = {
  activeSection: ExperimentActiveSection;
  settingsLoading: boolean;
};

const initialState: WebAppState = {
  activeSection: 'ExperimentsSection',
  settingsLoading: false,
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
  },
});

export const { setActiveSection, setSettingsLoading } = webAppStateSlice.actions;
export const webAppStateReducer = webAppStateSlice.reducer;
