import axios from 'axios';
import { API_URL } from '../constants';
import type {
  RunOutputDto,
  RunTestingInputDto,
  RunTrainingInputDto,
} from '../models/experiment/run.type';
import { createAuthHeader } from '../utils/headers';

export const runNeptuneTrainingExperiment = async (
  data: RunTrainingInputDto,
  project: string,
  apiToken: string,
  jwtToken: string
) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/train-neptune`, data, {
    params: { project, api_token: apiToken },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};

export const runMLflowTrainingExperiment = async (
  data: RunTrainingInputDto,
  project: string,
  jwtToken: string
) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/train-mlflow`, data, {
    params: { project },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};

export const runNeptuneTestingExperiment = async (
  data: RunTestingInputDto,
  project: string,
  apiToken: string,
  jwtToken: string
) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/test-neptune`, data, {
    params: { project, api_token: apiToken },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};

export const runMLflowTestingExperiment = async (
  data: RunTestingInputDto,
  project: string,
  jwtToken: string
) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/test-mlflow`, data, {
    params: { project },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};
