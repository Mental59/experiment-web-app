import { Box, Button, Group, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useEffect } from 'react';
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
    runExperiment,
    experimentInfo,
    setExperimentMode,
    setExperimentTracker,
    setExperimentProject,
    setExperimentDataset,
    setExperimentRunName,
    setTrainRunId,
    ...trainRunnerSetters
  } = useExperimentRunner();

  const projects =
    experimentInfo.tracker === ExperimentTracker.MLflow
      ? mlflowTrackerInfo.projects
      : neptuneTrackerInfo.projects;

  console.log(experimentInfo);

  useEffect(() => {
    setExperimentProject(null);
  }, [projects]);

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
        <Select
          data={datasets}
          value={experimentInfo.dataset}
          onChange={setExperimentDataset}
          label="Набор данных"
          placeholder="Выберите набор данных"
        />
        <Select
          data={projects.map((project) => `${project.project_name} (${project.project_id})`)}
          value={experimentInfo.project}
          onChange={setExperimentProject}
          label="Проект"
          placeholder="Выберите проект"
        />
        <TextInput
          value={experimentInfo.runName ?? ''}
          onChange={(event) => setExperimentRunName(event.target.value)}
          label="Название эксперимента"
          placeholder="Введите название эксперимента"
        />

        {experimentInfo.mode === ExperimentMode.Train && (
          <TrainRunnerParams experimentInfo={experimentInfo} {...trainRunnerSetters} />
        )}

        {experimentInfo.mode === ExperimentMode.Test && (
          <TestRunnerParams
            projects={projects}
            trainRunId={experimentInfo.trainRunId}
            setTrainRunId={setTrainRunId}
          />
        )}
      </Stack>

      <Group justify="center">
        <Button onClick={() => runExperiment()}>Запустить</Button>
      </Group>
    </Box>
  );
}
