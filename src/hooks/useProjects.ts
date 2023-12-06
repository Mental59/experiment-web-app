import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  addMLflowRun,
  setMLflowProjects,
  setMLflowProjectsLoaded,
} from '../redux/trackerInfo/mlflowTrackerInfoSlice';
import {
  addNeptuneRun,
  setNeptuneProjects,
  setNeptuneProjectsLoaded,
} from '../redux/trackerInfo/neptuneTrackerInfoSlice';
import { getMLflowTrackerProjects, getNeptuneTrackerProjects } from '../requests/trackerInfo';
import type { RunOutputDto } from '../models/experiment/run.type';
import type { ExperimentRunTypeDto } from '../models/experimentTrackers/experiment.type';

export const useProjects = () => {
  const neptuneTrackerInfo = useAppSelector((state) => state.neptuneTrackerInfo);
  const mlflowTrackerInfo = useAppSelector((state) => state.mlflowTrackerInfo);
  const dispatch = useAppDispatch();

  const fetchNeptuneProjects = async () => {
    // TODO: data might be fetched several times
    if (neptuneTrackerInfo.projectsLoaded) {
      return;
    }

    if (neptuneTrackerInfo.correctApiToken) {
      const projects = await getNeptuneTrackerProjects(neptuneTrackerInfo.apiToken);
      dispatch(setNeptuneProjects(projects));
      dispatch(setNeptuneProjectsLoaded(true));
    }
  };

  const fetchMLflowProjects = async () => {
    // TODO: data might be fetched several times
    if (mlflowTrackerInfo.projectsLoaded) {
      return;
    }

    const projects = await getMLflowTrackerProjects();
    dispatch(setMLflowProjects(projects));
    dispatch(setMLflowProjectsLoaded(true));
  };

  const addRun = (run: RunOutputDto & { run_type: ExperimentRunTypeDto }) => {
    if (run.experiment_tracker === 'mlflow') {
      dispatch(addMLflowRun(run));
    } else {
      // neptune
      dispatch(addNeptuneRun(run));
    }
  };

  return {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    fetchMLflowProjects,
    fetchNeptuneProjects,
    addRun,
  };
};
