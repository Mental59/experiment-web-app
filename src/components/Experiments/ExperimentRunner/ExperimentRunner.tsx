import { Box, Button, Group, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useExperimentRunner } from '../../../hooks/useExperimentRunner';
import { GradientSegmentedControl } from '../../GradientSegmentedControl/GradientSegmentedControl';
import { ExperimentMode } from '../../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../../models/experimentRunner/experimentTracker';
import { TrainRunnerParams } from './TrainRunnerParams';
import { TestRunnerParams } from './TestRunnerParams';

export function ExperimentRunner() {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    datasets,
    runTestingExperiment,
    runTrainingExperiment,
    experimentInfo,
    setExperimentMode,
    setExperimentTracker,
    setTrainRunId,
  } = useExperimentRunner();

  console.log(datasets);
  console.log(neptuneTrackerInfo);
  console.log(mlflowTrackerInfo);

  return (
    <Box maw={750} miw={250} mx="auto" mt={20}>
      <SimpleGrid cols={2} spacing="sm">
        <Text>Режим</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentMode(value as ExperimentMode)}
          value={experimentInfo.mode}
          data={Object.values(ExperimentMode)}
        />

        <Text>Инструмент отслеживания экспериментов</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentTracker(value as ExperimentTracker)}
          value={experimentInfo.tracker}
          data={Object.values(ExperimentTracker)}
        />
      </SimpleGrid>

      <Stack mt="xl" mb="xl">
        <Select data={datasets} value={datasets.at(0)} label="Набор данных" />
        <TextInput label="Название эксперимента" />

        {experimentInfo.mode === ExperimentMode.Train && <TrainRunnerParams />}

        {experimentInfo.mode === ExperimentMode.Test && (
          <TestRunnerParams
            projects={
              experimentInfo.tracker === ExperimentTracker.MLflow
                ? mlflowTrackerInfo.projects
                : neptuneTrackerInfo.projects
            }
            trainRunId={experimentInfo.trainRunId}
            setTrainRunId={setTrainRunId}
          />
        )}
      </Stack>

      <Group justify="center">
        <Button onClick={() => console.log('Запуск обучения/тестирования')}>Запустить</Button>
      </Group>
    </Box>
  );
}
