import axios from 'axios';
import { FileWithPath } from '@mantine/dropzone';
import { API_URL } from '../constants';
import type { OntoTreeViewDto } from '../models/ontoParser/treeView.type';
import { SourceCodeModelDto } from '../models/ontoParser/sourceCodeModels.type';
import { createAuthHeader } from '../utils/headers';

export const getOntoTreeView = async (token: string) => {
  const response = await axios.get<OntoTreeViewDto[]>(`${API_URL}/onto-parser/tree-view`, {
    headers: createAuthHeader(token),
  });
  return response.data;
};

export const findModelsInSourceCode = async (files: FileWithPath[], token: string) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('source_files', file);
  });

  const response = await axios.post<SourceCodeModelDto[]>(
    `${API_URL}/onto-parser/find-models`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data', ...createAuthHeader(token) },
    }
  );

  return response.data;
};
