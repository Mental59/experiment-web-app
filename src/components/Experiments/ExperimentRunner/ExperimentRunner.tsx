import { Box, Button, Group, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useExperimentRunner } from '../../../hooks/useExperimentRunner';
import { GradientSegmentedControl } from '../../GradientSegmentedControl/GradientSegmentedControl';
import { ExperimentProjectInfoDto } from '../../../models/experimentTrackers/experimentTrackerInfo.type';
import { ExperimentMode } from '../../../models/experimentRunner/experimentMode';
import { ExperimentTracker } from '../../../models/experimentRunner/experimentTracker';

function TrainRunnerParams() {
  return (
    <>
      <div>TrainRunnerParams</div>
    </>
  );
}

function TestRunnerParams({ projects }: { projects: ExperimentProjectInfoDto[] }) {
  const runs = projects.flatMap((project) => project.runs);
  const trainRuns = runs.filter((run) => run.run_type === 'train');

  return (
    <>
      <Select data={trainRuns.map((run) => run.run_id)} label="Id обучающего эксперимента" />
    </>
  );
}

export function ExperimentRunner() {
  const {
    neptuneTrackerInfo,
    mlflowTrackerInfo,
    datasets,
    runTestingExperiment,
    runTrainingExperiment,
  } = useExperimentRunner();
  const [experimentMode, setExperimentMode] = useState(ExperimentMode.Train);
  const [experimentTracker, setExperimentTracker] = useState(ExperimentTracker.Neptune);

  // console.log(datasets);
  // console.log(neptuneTrackerInfo);
  // console.log(mlflowTrackerInfo);

  return (
    <Box maw={750} miw={250} mx="auto" mt={20}>
      <SimpleGrid cols={2} spacing="sm">
        <Text>Режим</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentMode(value as ExperimentMode)}
          defaultValue={experimentMode}
          data={Object.values(ExperimentMode)}
        />

        <Text>Инструмент отслеживания экспериментов</Text>
        <GradientSegmentedControl
          onChange={(value) => setExperimentTracker(value as ExperimentTracker)}
          defaultValue={experimentTracker}
          data={Object.values(ExperimentTracker)}
        />
      </SimpleGrid>

      <Stack mt="xl" mb="xl">
        <Select data={datasets} label="Набор данных" />
        <TextInput label="Название эксперимента" />

        {experimentMode === ExperimentMode.Train && <TrainRunnerParams />}

        {experimentMode === ExperimentMode.Test && (
          <TestRunnerParams
            projects={
              experimentTracker === ExperimentTracker.MLflow
                ? mlflowTrackerInfo.projects
                : neptuneTrackerInfo.projects
            }
          />
        )}
      </Stack>

      <Group justify="center">
        <Button onClick={() => console.log('Запуск обучения/тестирования')}>Запустить</Button>
      </Group>
    </Box>
  );
}
