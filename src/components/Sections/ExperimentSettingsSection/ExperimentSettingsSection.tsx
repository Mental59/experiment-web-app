import { Divider, Stack, Text, rem } from '@mantine/core';
import { InputWithButton } from '../../InputWithButton/InputWithButton';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { useExperimentSettings } from '../../../hooks/useExperimentSettings';

export function ExperimentSettingsSection() {
  const {
    handleApiTokenChange,
    handleApiTokenApply,
    settingsLoading,
    neptuneCorrectApiToken,
    neptuneApiToken,
  } = useExperimentSettings();

  return (
    <CustomLoadingOverlay visible={settingsLoading}>
      <Stack mx="auto">
        <Text>Neptune</Text>
        <Divider />
        <InputWithButton
          label="API токен"
          w={rem(500)}
          error={!neptuneCorrectApiToken && 'Неверный токен'}
          value={neptuneApiToken}
          disabled={settingsLoading}
          onChange={(event) => handleApiTokenChange(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleApiTokenApply()}
          onButtonClick={handleApiTokenApply}
        />
      </Stack>
    </CustomLoadingOverlay>
  );
}
