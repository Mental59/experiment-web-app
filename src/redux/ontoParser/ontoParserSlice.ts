import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { OntoTreeViewDto } from '../../models/ontoParser/treeView.type';
import {
  OntologyNodeDto,
  OntologyMLModelAttributes,
  OntologyBaseAttributes,
} from '../../models/ontoParser/ontoNodeDto.type';

export type OntoParserInfo = {
  treeViewLoading: boolean;
  treeViewDto: OntoTreeViewDto[];
  mlModels: OntologyNodeDto<OntologyMLModelAttributes>[];
  mlTasks: OntologyNodeDto<OntologyBaseAttributes>[][];
};

const initialState: OntoParserInfo = {
  treeViewLoading: false,
  treeViewDto: [],
  mlModels: [],
  mlTasks: [],
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
    setOntoMLModels: (
      state,
      action: PayloadAction<OntologyNodeDto<OntologyMLModelAttributes>[]>
    ) => {
      state.mlModels = action.payload;
    },
    setOntoMLTasks: (state, action: PayloadAction<OntologyNodeDto<OntologyBaseAttributes>[][]>) => {
      state.mlTasks = action.payload;
    },
  },
});

export const { setOntoTreeViewLoading, setOntoTreeViewDto, setOntoMLModels, setOntoMLTasks } =
  ontoParserInfoSlice.actions;
export const ontoParserInfoReducer = ontoParserInfoSlice.reducer;
