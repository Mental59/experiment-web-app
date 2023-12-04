import { useEffect } from 'react';
import { useDatasets } from './useDatasets';
import { useProjects } from './useProjects';

export const useExperimentRunner = () => {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    addRun,
    fetchMLflowProjects,
    fetchNeptuneProjects,
  } = useProjects();
  const { datasets, fetchDatasets } = useDatasets();

  const fetchData = async () => {
    await Promise.all([fetchMLflowProjects(), fetchNeptuneProjects(), fetchDatasets()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { neptuneTrackerInfo, mlflowTrackerInfo, datasets, addRun };
};
