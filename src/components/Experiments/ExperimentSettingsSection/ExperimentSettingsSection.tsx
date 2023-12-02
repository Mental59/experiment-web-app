import { Divider, Stack, Text, TextInput } from '@mantine/core';

export function ExperimentSettingsSection() {
  return (
    <Stack>
      <Text>Neptune</Text>
      <Divider />
      <TextInput label="Проект" />
      <TextInput label="API ключ" mb="xl" />
    </Stack>
  );
}
