import { Anchor, Divider, Stack, Text } from '@mantine/core';
import { MLFLOW_URL } from '../../../constants';

export function LinksSection() {
  return (
    <Stack>
      <Text>Инструменты для отслеживания экспериментов</Text>
      <Divider />

      <Anchor href={MLFLOW_URL} target="_blank" underline="hover">
        <Text>MLflow</Text>
      </Anchor>
      <Anchor href="https://app.neptune.ai/" target="_blank" underline="hover">
        <Text>Neptune</Text>
      </Anchor>
    </Stack>
  );
}
