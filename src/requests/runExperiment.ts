import axios from 'axios';
import { API_URL } from '../constants';
import type {
  RunOutputDto,
  BiLSTMCRFRunTestingInputDto,
  BiLSTMCRFRunTrainingInputDto,
} from '../models/experiment/run.type';
import { createAuthHeader } from '../utils/headers';

export const runBiLSTMCRFTrainingExperiment = async ({
  apiToken,
  data,
  jwtToken,
  project,
}: {
  data: BiLSTMCRFRunTrainingInputDto;
  project: string;
  apiToken?: string;
  jwtToken: string;
}) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/train-bilstm-crf`, data, {
    params: { project, api_token: apiToken },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};

export const runBiLSTMCRFTestingExperiment = async ({
  apiToken,
  data,
  jwtToken,
  project,
}: {
  data: BiLSTMCRFRunTestingInputDto;
  project: string;
  apiToken?: string;
  jwtToken: string;
}) => {
  const response = await axios.post<RunOutputDto>(`${API_URL}/ml/test-bilstm-crf`, data, {
    params: { project, api_token: apiToken },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};
