import { useEffect } from 'react';
import { useDatasets } from './useDatasets';
import { useProjects } from './useProjects';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  setExperimentMode,
  setExperimentTracker,
  setTrainRunId,
} from '../redux/experimentInfo/experimentInfoSlice';
import { ExperimentMode } from '../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../models/experimentRunner/experimentTracker';

export const useExperimentRunner = () => {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    fetchMLflowProjects,
    fetchNeptuneProjects,
    runTestingExperiment,
    runTrainingExperiment,
  } = useProjects();
  const { datasets, fetchDatasets } = useDatasets();

  const experimentInfo = useAppSelector((state) => state.experimentInfo);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await Promise.all([fetchMLflowProjects(), fetchNeptuneProjects(), fetchDatasets()]);
  };

  useEffect(() => {
    fetchData(); // TODO: the data might be fetched multiple times if the component was unmounted and then mounted again while the data was still fetching
  }, []);

  return {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    datasets,
    runTestingExperiment,
    runTrainingExperiment,
    experimentInfo,
    setExperimentMode: (mode: ExperimentMode) => dispatch(setExperimentMode(mode)),
    setExperimentTracker: (tracker: ExperimentTracker) => dispatch(setExperimentTracker(tracker)),
    setTrainRunId: (runId: string | null) => dispatch(setTrainRunId(runId)),
  };
};
