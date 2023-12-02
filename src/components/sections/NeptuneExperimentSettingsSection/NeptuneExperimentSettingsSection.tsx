import { Stack, TextInput } from '@mantine/core';

export function NeptuneExperimentSettingsSection() {
  return (
    <Stack>
      <TextInput label="Проект" />
      <TextInput label="Neptune API ключ" />
    </Stack>
  );
}
