import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ExperimentActiveSection = 'ExperimentsSection' | 'NeptuneExperimentSettingsSection';
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
    setActiveSectionIndex: (state, action: PayloadAction<ExperimentActiveSection>) => {
      const activeSection = action.payload;
      state.activeSection = activeSection;
    },
  },
});

export const { setActiveSectionIndex } = experimentMenuSectionSlice.actions;
export const experimentMenuSectionReducer = experimentMenuSectionSlice.reducer;
