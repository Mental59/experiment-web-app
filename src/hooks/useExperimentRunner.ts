import { useEffect } from 'react';
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
  setExperimentRunnerModelType,
} from '../redux/experimentInfo/experimentInfoSlice';
import { ExperimentMode } from '../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../models/experimentRunner/experimentTracker';
import { ExperimentMLModel } from '../models/experimentRunner/experimentModel';
import {
  MLModelDto,
  BiLSTMCRFRunTestingInputDto,
  BiLSTMCRFRunTrainingInputDto,
} from '../models/experiment/run.type';
import {
  runBiLSTMCRFTestingExperiment,
  runBiLSTMCRFTrainingExperiment,
  testTransformerByModelName,
} from '../requests/runExperiment';
import {
  getErrorMessageFromException,
  showDefaultNotification,
  showErrorNotification,
} from '../utils/notifier';
import { ExperimentRunnerModelType } from '../models/experimentRunner/experimentModelType';

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
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const _runBiLSTMCRFTrainingExperiment = async ({
    params,
    project,
  }: {
    params: BiLSTMCRFRunTrainingInputDto;
    project: string;
  }) => {
    showDefaultNotification(`Запущен обучающий эксперимент ${params.run_name}`);

    try {
      const res = await runBiLSTMCRFTrainingExperiment({
        data: params,
        jwtToken: token,
        project,
        apiToken: neptuneTrackerInfo.apiToken,
      });
      addRun({ ...res, run_type: 'train' });
      showDefaultNotification(`Обучающий эксперимент ${params.run_name} успешно завершился`);
    } catch (err) {
      showErrorNotification(
        `Обучающий эксперимент ${
          params.run_name
        } завершился с ошибкой: ${getErrorMessageFromException(err)}`
      );
    }
  };

  const _runBiLSTMCRFTestingExperiment = async ({
    params,
    project,
  }: {
    params: BiLSTMCRFRunTestingInputDto;
    project: string;
  }) => {
    showDefaultNotification(`Запущен тестирующий эксперимент ${params.run_name}`);

    try {
      const res = await runBiLSTMCRFTestingExperiment({
        data: params,
        jwtToken: token,
        project,
        apiToken: neptuneTrackerInfo.apiToken,
      });
      addRun({ ...res, run_type: 'test' });
      showDefaultNotification(`Тестирущий эксперимент ${params.run_name} успешно завершился`);
    } catch (err) {
      showErrorNotification(
        `Тестирующий эксперимент ${
          params.run_name
        } завершился с ошибкой: ${getErrorMessageFromException(err)}`
      );
    }
  };

  const runBiLSTMCRFExperiment = () => {
    if (!experimentInfo.dataset) {
      showErrorNotification('Не указан набор данных');
      return;
    }

    if (!experimentInfo.runName) {
      showErrorNotification('Не указано название эксперимента');
      return;
    }

    if (!experimentInfo.project) {
      showErrorNotification('Не указано название проекта');
      return;
    }

    if (experimentInfo.mode === ExperimentMode.Train) {
      let model: MLModelDto = 'LSTM_CRF';
      switch (experimentInfo.model) {
        case ExperimentMLModel.BERT:
          model = 'BERT';
          break;
        case ExperimentMLModel.CRF:
          model = 'CRF';
          break;
        case ExperimentMLModel.LSTM:
          model = 'LSTM';
          break;
        case ExperimentMLModel.LSTM_CRF:
          model = 'LSTM_CRF';
          break;
      }

      _runBiLSTMCRFTrainingExperiment({
        params: {
          dataset: experimentInfo.dataset,
          run_name: experimentInfo.runName,
          base_experiment_id: experimentInfo.baseExperimentId,
          experiment_tracker:
            experimentInfo.tracker === ExperimentTracker.MLflow ? 'mlflow' : 'neptune',
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
        showErrorNotification('Не указан обучающий эксперимент');
        return;
      }

      _runBiLSTMCRFTestingExperiment({
        params: {
          dataset: experimentInfo.dataset,
          run_name: experimentInfo.runName,
          train_run_id: experimentInfo.trainRunId.split(' ')[1].slice(1, -1),
          base_experiment_id: experimentInfo.baseExperimentId,
          experiment_tracker:
            experimentInfo.tracker === ExperimentTracker.MLflow ? 'mlflow' : 'neptune',
        },
        project: experimentInfo.project,
      });
    }
  };

  const runExperimentWithUserModel = async () => {
    if (!experimentInfo.dataset) {
      showErrorNotification('Не указан набор данных');
      return;
    }

    if (!experimentInfo.runName) {
      showErrorNotification('Не указано название эксперимента');
      return;
    }

    if (!experimentInfo.project) {
      showErrorNotification('Не указано название проекта');
      return;
    }

    if (!experimentInfo.experimentUserModelNameOrPath) {
      showErrorNotification('Не указана загруженная модель');
      return;
    }

    const { runName } = experimentInfo;

    try {
      showDefaultNotification(`Запущен тестирующий эксперимент ${runName}`);
      const res = await testTransformerByModelName({
        data: {
          dataset: experimentInfo.dataset,
          experiment_tracker:
            experimentInfo.tracker === ExperimentTracker.MLflow ? 'mlflow' : 'neptune',
          model_name_or_path: experimentInfo.experimentUserModelNameOrPath,
          run_name: runName,
        },
        jwtToken: token,
        project: experimentInfo.project,
        apiToken: neptuneTrackerInfo.apiToken,
      });
      addRun({ ...res, run_type: 'test' });
      showDefaultNotification(`Тестирущий эксперимент ${runName} успешно завершился`);
    } catch (err) {
      showErrorNotification(
        `Тестирующий эксперимент ${runName} завершился с ошибкой: ${getErrorMessageFromException(
          err
        )}`
      );
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
    runBiLSTMCRFExperiment,
    runExperimentWithUserModel,
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
    setExperimentRunnerModelType: (type: ExperimentRunnerModelType) =>
      dispatch(setExperimentRunnerModelType(type)),
  };
};
