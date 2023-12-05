import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
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
import type {
  RunOutputDto,
  RunTestingInputDto,
  RunTrainingInputDto,
} from '../models/experiment/run.type';
import type { ExperimentRunTypeDto } from '../models/experimentTrackers/experiment.type';
import { ExperimentTracker } from '../models/experimentRunner/experimentTracker';
import {
  runMLflowTestingExperiment,
  runMLflowTrainingExperiment,
  runNeptuneTestingExperiment,
  runNeptuneTrainingExperiment,
} from '../requests/runExperiment';

export const useProjects = () => {
  const neptuneTrackerInfo = useAppSelector((state) => state.neptuneTrackerInfo);
  const mlflowTrackerInfo = useAppSelector((state) => state.mlflowTrackerInfo);
  const dispatch = useAppDispatch();

  const fetchNeptuneProjects = async () => {
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

  const runTrainingExperiment = async ({
    tracker,
    params,
    project,
  }: {
    tracker: ExperimentTracker;
    params: RunTrainingInputDto;
    project: string;
  }) => {
    notifications.show({
      title: 'Эксперимент',
      message: `Запущен эксперимент ${params.run_name}`,
    });

    const promise =
      tracker === ExperimentTracker.MLflow
        ? runMLflowTrainingExperiment(params, project)
        : runNeptuneTrainingExperiment(params, project, neptuneTrackerInfo.apiToken);

    try {
      const res = await promise;
      addRun({ ...res, run_type: 'train' });
    } catch (err) {
      const axiosErr = err as AxiosError;
      notifications.show({
        title: 'Эксперимент',
        message: `Эксперимент ${params.run_name} завершился с ошибкой: ${axiosErr.message}`,
        color: 'red',
      });
    }
  };

  const runTestingExperiment = async ({
    tracker,
    params,
    project,
  }: {
    tracker: ExperimentTracker;
    params: RunTestingInputDto;
    project: string;
  }) => {
    notifications.show({
      title: 'Эксперимент',
      message: `Запущен эксперимент ${params.run_name}`,
    });

    const promise =
      tracker === ExperimentTracker.MLflow
        ? runMLflowTestingExperiment(params, project)
        : runNeptuneTestingExperiment(params, project, neptuneTrackerInfo.apiToken);

    try {
      const res = await promise;
      addRun({ ...res, run_type: 'test' });
    } catch (err) {
      const axiosErr = err as AxiosError;
      notifications.show({
        title: 'Эксперимент',
        message: `Эксперимент ${params.run_name} завершился с ошибкой: ${axiosErr.message}`,
        color: 'red',
      });
    }
  };

  return {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    fetchMLflowProjects,
    fetchNeptuneProjects,
    runTrainingExperiment,
    runTestingExperiment,
  };
};
