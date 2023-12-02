import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ExperimentActiveSection = 'ExperimentsSection' | 'ExperimentSettingsSection';
export interface ExperimentMenuSectionState {
  activeSection: ExperimentActiveSection;
}

const initialState: ExperimentMenuSectionState = {
  activeSection: 'ExperimentsSection',
};

export const experimentMenuSectionSlice = createSlice({
  name: 'experimentMenuSection',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ExperimentActiveSection>) => {
      const activeSection = action.payload;
      state.activeSection = activeSection;
    },
  },
});

export const { setActiveSection } = experimentMenuSectionSlice.actions;
export const experimentMenuSectionReducer = experimentMenuSectionSlice.reducer;
