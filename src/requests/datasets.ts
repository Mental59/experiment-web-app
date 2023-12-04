import { FileWithPath } from '@mantine/dropzone';
import axios from 'axios';
import { API_URL } from '../constants';

export const uploadDatasets = async (datasets: FileWithPath[]) => {
  const formData = new FormData();

  datasets.forEach((dataset) => {
    formData.append('datasets', dataset);
  });

  const response = await axios.post<string[]>(`${API_URL}/datasets/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const getDatasets = async () => {
  const response = await axios.get<string[]>(`${API_URL}/datasets`);
  return response.data;
};
