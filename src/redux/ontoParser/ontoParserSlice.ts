import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { OntoTreeViewDto } from '../../models/ontoParser/treeView.type';
import { SourceCodeModelDto } from '../../models/ontoParser/sourceCodeModels.type';

export type OntoParserInfo = {
  treeViewLoading: boolean;
  sourceCodeModels: SourceCodeModelDto[];
  treeViewDto: OntoTreeViewDto[];
};

const initialState: OntoParserInfo = {
  treeViewLoading: false,
  treeViewDto: [],
  sourceCodeModels: [],
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
    setSourceCodeModels: (state, action: PayloadAction<SourceCodeModelDto[]>) => {
      state.sourceCodeModels = action.payload;
    },
  },
});

export const { setOntoTreeViewLoading, setOntoTreeViewDto, setSourceCodeModels } =
  ontoParserInfoSlice.actions;
export const ontoParserInfoReducer = ontoParserInfoSlice.reducer;
