import { Button, Grid, Group, Stack, Stepper } from '@mantine/core';
import { ExperimentRunner } from '../../Experiments/ExperimentRunner/ExperimentRunner';
import { SourceCodeUploader } from '../../Experiments/SourceCodeUploader/SourceCodeUploader';
import { useExperimentTab } from '../../../hooks/useExperimentTab';
// import { OntoTreeView } from '../../OntoTreeView/OntoTreeView';

export function ExperimentsTab() {
  const { active, handleBackButton, handleNextButton, sourceCodeModels } = useExperimentTab();

  return (
    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      {/* <Grid.Col ml={25} mt={25} span={2}>
        <OntoTreeView />
      </Grid.Col> */}

      <Grid.Col span={12}>
        <Stack>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={handleBackButton}>
              Назад
            </Button>
            <Button onClick={handleNextButton} disabled={sourceCodeModels.length === 0}>
              Вперед
            </Button>
          </Group>

          <Stepper active={active} size="xl">
            <Stepper.Step
              label="Загрузка исходного кода"
              description="Загрузите исходный код экспериментов"
            >
              <SourceCodeUploader />
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
