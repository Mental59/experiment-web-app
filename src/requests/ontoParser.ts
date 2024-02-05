import axios from 'axios';
import { API_URL } from '../constants';
import type { OntoTreeViewDto } from '../models/ontoParser/treeView.type';

export const getOntoTreeView = async () => {
  const response = await axios.get<OntoTreeViewDto[]>(`${API_URL}/onto-parser/tree-view`);
  return response.data;
};
