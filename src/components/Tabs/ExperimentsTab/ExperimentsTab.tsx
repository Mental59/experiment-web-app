import { Button, Center, Grid, Group, Stack, Stepper, Text } from '@mantine/core';
import { ExperimentRunner } from '../../Experiments/ExperimentRunner/ExperimentRunner';
import { SourceCodeUploader } from '../../Experiments/SourceCodeUploader/SourceCodeUploader';
import { useExperimentTab } from '../../../hooks/useExperimentTab';
import { ExperimentRunTypeSelector } from '../../Experiments/ExperimentSelector/ExperimentRunTypeSelector';
import { ExperimentSelectorRunType } from '../../../models/experiment/experimentSelectorRunType.type';

export function ExperimentsTab() {
  const { active, handleBackButton, handleNextButton, runType, setRunType } = useExperimentTab({
    numSteps: 3,
  });

  return (
    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      <Grid.Col span={12}>
        <Stack>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={handleBackButton}>
              Назад
            </Button>
            <Button onClick={handleNextButton}>Вперед</Button>
          </Group>

          <Stepper active={active} size="xl">
            <Stepper.Step
              label="Выбор типа запуска"
              description="Выберите один из типов запуска эксперимента"
            >
              <ExperimentRunTypeSelector runType={runType} setRunType={setRunType} />
            </Stepper.Step>
            <Stepper.Step label="Настройка запуска" description="Настройте выбранный тип запуска">
              {runType === ExperimentSelectorRunType.Empty && (
                <Center>
                  <Text size="xl" fw={700}>
                    Нет настроек
                  </Text>
                </Center>
              )}
              {runType === ExperimentSelectorRunType.WithModelsExtraction && <SourceCodeUploader />}
              {runType === ExperimentSelectorRunType.BasedOnOtherExperiment && (
                <Center>
                  <Text size="xl" fw={700}>
                    Таблица с экспериментами
                  </Text>
                </Center>
              )}
            </Stepper.Step>
            <Stepper.Step
              label="Запуск эксперимента"
              description="Настройте параметры и запустите эксперимент"
            >
              <ExperimentRunner />
            </Stepper.Step>
          </Stepper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
