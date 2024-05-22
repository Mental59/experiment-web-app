import { Box, Button, Group, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { useExperimentRunner } from '../../../hooks/useExperimentRunner';
import { GradientSegmentedControl } from '../../GradientSegmentedControl/GradientSegmentedControl';
import { ExperimentMode } from '../../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../../models/experimentRunner/experimentTracker';
import { ExperimentRunnerModelType } from '../../../models/experimentRunner/experimentModelType';
import { TestRunnerParamsForUserModel } from './TestRunnerParamsForUserModel';
import { TrainRunnerParamsForBuiltinModel } from './TrainRunnerParamsForBuiltinModel';
import { TestRunnerParamsForBuiltinModel } from './TestRunnerParamsForBuiltinModel';

export function ExperimentRunner() {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    datasets,
    runBiLSTMCRFExperiment,
    experimentInfo,
    setExperimentMode,
    setExperimentTracker,
    setExperimentProject,
    setExperimentDataset,
    setExperimentRunName,
    setTrainRunId,
    setExperimentRunnerModelType,
    runExperimentWithUserModel,
    ...trainRunnerSetters
  } = useExperimentRunner();

  const projects =
    experimentInfo.tracker === ExperimentTracker.MLflow
      ? mlflowTrackerInfo.projects
      : neptuneTrackerInfo.projects;

  useEffect(() => {
    setExperimentProject(null);
  }, [projects]);

  return (
    <Box maw={750} miw={250} mx="auto" mt={20}>
      <SimpleGrid cols={2} spacing="sm">
        <Text>Тип модели</Text>
        <GradientSegmentedControl
          data={Object.values(ExperimentRunnerModelType)}
          value={experimentInfo.experimentRunnerModelType}
          onChange={(value) => {
            setExperimentRunnerModelType(value as ExperimentRunnerModelType);
            setExperimentMode(ExperimentMode.Test);
          }}
        />

        <Text>Режим</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentMode(value as ExperimentMode)}
          value={experimentInfo.mode}
          data={Object.values(ExperimentMode)}
          disabled={
            experimentInfo.experimentRunnerModelType === ExperimentRunnerModelType.UserModels
          }
        />

        <Text>Инструмент отслеживания экспериментов</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentTracker(value as ExperimentTracker)}
          value={experimentInfo.tracker}
          data={Object.values(ExperimentTracker)}
        />
      </SimpleGrid>

      <Stack mt="xl" mb="xl">
        <Select
          data={datasets}
          value={experimentInfo.dataset}
          onChange={setExperimentDataset}
          label="Набор данных"
          placeholder="Выберите набор данных"
          withAsterisk
        />
        <Select
          data={projects.map((project) => project.project_name)}
          value={experimentInfo.project}
          onChange={setExperimentProject}
          label="Проект"
          placeholder="Выберите проект"
          withAsterisk
        />
        <TextInput
          value={experimentInfo.runName ?? ''}
          onChange={(event) => setExperimentRunName(event.target.value)}
          label="Название эксперимента"
          placeholder="Введите название эксперимента"
          withAsterisk
        />

        {experimentInfo.mode === ExperimentMode.Train && (
          <TrainRunnerParamsForBuiltinModel
            experimentInfo={experimentInfo}
            {...trainRunnerSetters}
          />
        )}

        {experimentInfo.mode === ExperimentMode.Test &&
          experimentInfo.experimentRunnerModelType === ExperimentRunnerModelType.BuiltInModels && (
            <TestRunnerParamsForBuiltinModel
              projects={projects}
              trainRunId={experimentInfo.trainRunId}
              setTrainRunId={setTrainRunId}
            />
          )}

        {experimentInfo.mode === ExperimentMode.Test &&
          experimentInfo.experimentRunnerModelType === ExperimentRunnerModelType.UserModels && (
            <TestRunnerParamsForUserModel />
          )}
      </Stack>

      <Group justify="center">
        <Button
          w={200}
          h={50}
          onClick={() => {
            if (
              experimentInfo.experimentRunnerModelType === ExperimentRunnerModelType.BuiltInModels
            ) {
              runBiLSTMCRFExperiment();
            } else {
              runExperimentWithUserModel();
            }
          }}
        >
          Запустить
        </Button>
      </Group>
    </Box>
  );
}
