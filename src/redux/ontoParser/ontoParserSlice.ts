import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { OntoTreeViewDto } from '../../models/ontoParser/treeView.type';

export type OntoParserInfo = {
  treeViewLoading: boolean;
  treeViewDto: OntoTreeViewDto[];
};

const initialState: OntoParserInfo = {
  treeViewLoading: false,
  treeViewDto: [],
};

export const ontoParserInfoSlice = createSlice({
  name: 'ontoParserInfo',
  initialState,
  reducers: {
    setOntoTreeViewLoading: (state, action: PayloadAction<boolean>) => {
      state.treeViewLoading = action.payload;
    },
    setOntoTreeViewDto: (state, action: PayloadAction<OntoTreeViewDto[]>) => {
      state.treeViewDto = action.payload;
    },
  },
});

export const { setOntoTreeViewLoading, setOntoTreeViewDto } = ontoParserInfoSlice.actions;
export const ontoParserInfoReducer = ontoParserInfoSlice.reducer;
