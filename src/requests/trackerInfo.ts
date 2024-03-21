import axios from 'axios';
import { API_URL } from '../constants';
import {
  ExperimentProjectInfoDto,
  ExperimentTrackerInfoDto,
} from '../models/experimentTrackers/experimentTrackerInfo.type';
import { createAuthHeader } from '../utils/headers';

const filterOutUnknownProjects = (projects: ExperimentProjectInfoDto[]) =>
  projects.map((project) => {
    project.runs = project.runs.filter((run) => run.run_type !== 'unknown');
    return project;
  });

export const getNeptuneTrackerProjects = async (apiToken: string, jwtToken: string) => {
  const neptuneTrackerInfoResponse = await axios.get<ExperimentTrackerInfoDto>(
    `${API_URL}/exp/neptune-tracker-info`,
    {
      params: {
        api_token: apiToken,
      },
      headers: createAuthHeader(jwtToken),
    }
  );
  return filterOutUnknownProjects(neptuneTrackerInfoResponse.data.projects);
};

export const checkNeptuneApiToken = async (apiToken: string, jwtToken: string) => {
  const response = await axios.get<boolean>(`${API_URL}/exp/neptune-check-api-token`, {
    params: { api_token: apiToken },
    headers: createAuthHeader(jwtToken),
  });
  return response.data;
};

export const getMLflowTrackerProjects = async (jwtToken: string) => {
  const mlflowTrackerInfoResponse = await axios.get<ExperimentTrackerInfoDto>(
    `${API_URL}/exp/mlflow-tracker-info`,
    { headers: createAuthHeader(jwtToken) }
  );
  return filterOutUnknownProjects(mlflowTrackerInfoResponse.data.projects);
};
