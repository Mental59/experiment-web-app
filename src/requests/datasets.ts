import { FileWithPath } from '@mantine/dropzone';
import axios from 'axios';
import { API_URL } from '../constants';
import { createAuthHeader } from '../utils/headers';

export const uploadDatasets = async (datasets: FileWithPath[], token: string) => {
  const formData = new FormData();

  datasets.forEach((dataset) => {
    formData.append('datasets', dataset);
  });

  const response = await axios.post<string[]>(`${API_URL}/datasets/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', ...createAuthHeader(token) },
  });

  return response.data;
};

export const getDatasets = async (token: string) => {
  const response = await axios.get<string[]>(`${API_URL}/datasets`, {
    headers: createAuthHeader(token),
  });
  return response.data;
};
