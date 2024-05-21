import axios from 'axios';
import { FileWithPath } from '@mantine/dropzone';
import { API_URL } from '../constants';
import type { OntoTreeViewDto } from '../models/ontoParser/treeView.type';
import type { SourceCodeModelDto } from '../models/ontoParser/sourceCodeModels.type';
import { createAuthHeader } from '../utils/headers';
import type {
  OntologyBaseAttributes,
  OntologyMLModelAttributes,
  OntologyNodeDto,
} from '../models/ontoParser/ontoNodeDto.type';

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

export const getModels = async (token: string) => {
  const response = await axios.get<OntologyNodeDto<OntologyMLModelAttributes>[]>(
    `${API_URL}/onto-parser/models`,
    { headers: createAuthHeader(token) }
  );
  return response.data;
};

export const getMLTasks = async (token: string) => {
  const response = await axios.get<OntologyNodeDto<OntologyBaseAttributes>[][]>(
    `${API_URL}/onto-parser/ml-tasks`,
    { headers: createAuthHeader(token) }
  );
  return response.data;
};

export const addMLTask = async (
  data: { new_node_name: string; parent_node_id?: string },
  token: string
) => {
  const response = await axios.post<boolean>(`${API_URL}/onto-parser/add-ml-task`, data, {
    headers: createAuthHeader(token),
  });
  return response.data;
};

export const addTransformerModel = async (
  data: { parent_node_id: string; node_name: string; model_name_or_path: string },
  token: string
) => {
  const response = await axios.post<boolean>(`${API_URL}/onto-parser/add-transformer-model`, data, {
    headers: createAuthHeader(token),
  });
  return response.data;
};
