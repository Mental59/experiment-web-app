import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ExperimentActiveSection } from '../../models/experiment/section.type';
import { TokenDto } from '../../models/auth/auth.type';
import { getCachedToken, setCachedToken } from './cachedJWT';

export type WebAppState = {
  activeSection: ExperimentActiveSection;
  settingsLoading: boolean;
  datasetsLoading: boolean;
  sourceCodeLoading: boolean;
  datasetsLoaded: boolean;
  token: string;
};

const cachedToken = getCachedToken();
const initialState: WebAppState = {
  activeSection: 'ExperimentsSection',
  settingsLoading: false,
  datasetsLoading: false,
  datasetsLoaded: false,
  sourceCodeLoading: false,
  token: cachedToken ?? '',
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
    setToken: (state, action: PayloadAction<TokenDto | null>) => {
      const token = action.payload;
      setCachedToken(token?.access_token ?? null);
      state.token = token?.access_token ?? '';
    },
  },
});

export const {
  setActiveSection,
  setSettingsLoading,
  setDatasetsLoading,
  setDatasetsLoaded,
  setSourceCodeLoading,
  setToken,
} = webAppStateSlice.actions;
export const webAppStateReducer = webAppStateSlice.reducer;
