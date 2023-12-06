import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useDatasets } from './useDatasets';
import { useProjects } from './useProjects';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  setBatchSize,
  setCaseSensitive,
  setEmbeddingDim,
  setExperimentDataset,
  setExperimentMLModel,
  setExperimentMode,
  setExperimentProject,
  setExperimentRunName,
  setExperimentTracker,
  setHiddenDim,
  setLearningRate,
  setNum2words,
  setNumEpochs,
  setSchedulerFactor,
  setSchedulerPatience,
  setTestSize,
  setTrainRunId,
  setWeightDecay,
} from '../redux/experimentInfo/experimentInfoSlice';
import { ExperimentMode } from '../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../models/experimentRunner/experimentTracker';
import { ExperimentMLModel } from '../models/experimentRunner/experimentModel';
import { RunTestingInputDto, RunTrainingInputDto } from '../models/experiment/run.type';
import {
  runMLflowTestingExperiment,
  runMLflowTrainingExperiment,
  runNeptuneTestingExperiment,
  runNeptuneTrainingExperiment,
} from '../requests/runExperiment';

export const useExperimentRunner = () => {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    fetchMLflowProjects,
    fetchNeptuneProjects,
    addRun,
  } = useProjects();
  const { datasets, fetchDatasets } = useDatasets();

  const experimentInfo = useAppSelector((state) => state.experimentInfo);
  const dispatch = useAppDispatch();

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

  const runExperiment = () => {
    if (!experimentInfo.dataset) {
      notifications.show({ title: 'Эксперимент', message: 'Не указан набор данных', color: 'red' });
      return;
    }

    if (!experimentInfo.runName) {
      notifications.show({
        title: 'Эксперимент',
        message: 'Не указано название эксперимента',
        color: 'red',
      });
      return;
    }

    if (!experimentInfo.project) {
      notifications.show({
        title: 'Эксперимент',
        message: 'Не указано название проекта',
        color: 'red',
      });
      return;
    }

    // const trainRunIdParsed =
    //   experimentInfo.trainRunId !== null
    //     ? experimentInfo.trainRunId.split(' ')[1].slice(1, -1)
    //     : experimentInfo.trainRunId;

    if (experimentInfo.mode === ExperimentMode.Train) {
      runTrainingExperiment({
        tracker: experimentInfo.tracker,
        params: {
          dataset: experimentInfo.dataset,
          run_name: experimentInfo.runName,
          model:
            experimentInfo.model === ExperimentMLModel.BiLSTM_CRF ? 'BiLSTM_CRF' : 'BiLSTM_CRF',
          model_params: {
            embedding_dim: experimentInfo.embeddingDim,
            hidden_dim: experimentInfo.hiddenDim,
          },
          train_params: {
            batch_size: experimentInfo.batchSize,
            case_sensitive: experimentInfo.caseSensitive,
            learning_rate: experimentInfo.learningRate,
            num2words: experimentInfo.num2words,
            num_epochs: experimentInfo.numEpochs,
            scheduler_factor: experimentInfo.schedulerFactor,
            scheduler_patience: experimentInfo.schedulerPatience,
            test_size: experimentInfo.testSize,
            weight_decay: experimentInfo.weightDecay,
          },
        },
        project: experimentInfo.project,
      });
    } else {
      if (!experimentInfo.trainRunId) {
        notifications.show({
          title: 'Эксперимент',
          message: 'Не указано обучающий эксперимент',
          color: 'red',
        });
        return;
      }

      runTestingExperiment({
        tracker: experimentInfo.tracker,
        params: {
          dataset: experimentInfo.dataset,
          run_name: experimentInfo.runName,
          train_run_id: experimentInfo.trainRunId,
        },
        project: experimentInfo.project,
      });
    }
  };

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
    runExperiment,
    experimentInfo,
    setExperimentProject: (project: string | null) => dispatch(setExperimentProject(project)),
    setExperimentDataset: (dataset: string | null) => dispatch(setExperimentDataset(dataset)),
    setExperimentRunName: (runName: string | null) => dispatch(setExperimentRunName(runName)),
    setExperimentMode: (mode: ExperimentMode) => dispatch(setExperimentMode(mode)),
    setExperimentTracker: (tracker: ExperimentTracker) => dispatch(setExperimentTracker(tracker)),
    setTrainRunId: (runId: string | null) => dispatch(setTrainRunId(runId)),
    setMLModel: (model: ExperimentMLModel) => dispatch(setExperimentMLModel(model)),
    setEmbeddingDim: (embeddingDim: number) => dispatch(setEmbeddingDim(embeddingDim)),
    setHiddenDim: (hiddenDim: number) => dispatch(setHiddenDim(hiddenDim)),
    setBatchSize: (batchSize: number) => dispatch(setBatchSize(batchSize)),
    setNumEpochs: (numEpochs: number) => dispatch(setNumEpochs(numEpochs)),
    setLearningRate: (learningRate: number) => dispatch(setLearningRate(learningRate)),
    setSchedulerFactor: (schedulerFactor: number) => dispatch(setSchedulerFactor(schedulerFactor)),
    setSchedulerPatience: (schedulerPatience: number) =>
      dispatch(setSchedulerPatience(schedulerPatience)),
    setWeightDecay: (weightDecay: number) => dispatch(setWeightDecay(weightDecay)),
    setCaseSensitive: (caseSensitive: boolean) => dispatch(setCaseSensitive(caseSensitive)),
    setTestSize: (testSize: number) => dispatch(setTestSize(testSize)),
    setNum2words: (num2words: boolean) => dispatch(setNum2words(num2words)),
  };
};
