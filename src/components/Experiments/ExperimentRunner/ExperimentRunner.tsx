import { Box, Button, Group, TextInput } from '@mantine/core';
import { useExperimentRunner } from '../../../hooks/useExperimentRunner';

export function ExperimentRunner() {
  const { neptuneTrackerInfo, mlflowTrackerInfo, datasets, addRun } = useExperimentRunner();

  console.log(datasets);
  console.log(neptuneTrackerInfo);
  console.log(mlflowTrackerInfo);

  return (
    <Box maw={500} mx="auto">
      <TextInput label="Name" placeholder="Name" />
      <TextInput mt="md" label="Email" placeholder="Email" />

      <Group justify="center" mt="xl">
        <Button onClick={() => console.log('Запуск обучения/тестирования')}>Запустить</Button>
      </Group>
    </Box>
  );
}
