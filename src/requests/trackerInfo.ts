import axios from 'axios';
import { API_URL } from '../constants';
import { ExperimentTrackerInfoDto } from '../models/experimentTrackers/experimentTrackerInfo.type';

export const getNeptuneTrackerProjects = async (apiToken: string) => {
  const neptuneTrackerInfoResponse = await axios.get<ExperimentTrackerInfoDto>(
    `${API_URL}/exp/neptune-tracker-info`,
    {
      params: {
        api_token: apiToken,
      },
    }
  );
  const { projects } = neptuneTrackerInfoResponse.data;

  projects.map((project) => {
    project.runs = project.runs.filter((run) => run.run_type !== 'unknown');
    return project;
  });

  return projects;
};
