import { Divider, Select, Stack, Text } from '@mantine/core';
import { InputWithButton } from '../../InputWithButton/InputWithButton';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { useExperimentSettings } from '../../../hooks/useExperimentSettings';

export function ExperimentSettingsSection() {
  const {
    handleApiTokenChange,
    handleApiTokenApply,
    handleProjectChange,
    settingsLoading,
    neptuneTrackerInfo,
  } = useExperimentSettings();

  return (
    <CustomLoadingOverlay visible={settingsLoading}>
      <Stack>
        <Text>Neptune</Text>
        <Divider />
        <InputWithButton
          label="API токен"
          w="25%"
          error={!neptuneTrackerInfo.correctApiToken && 'Неверный токен'}
          value={neptuneTrackerInfo.apiToken}
          disabled={settingsLoading}
          onChange={(event) => handleApiTokenChange(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleApiTokenApply()}
          onButtonClick={handleApiTokenApply}
        />
        <Select
          radius="xl"
          label="Проект"
          w="25%"
          disabled={settingsLoading}
          data={neptuneTrackerInfo.projects.map((project) => project.project_id)}
          value={neptuneTrackerInfo.currentProjectId}
          onChange={handleProjectChange}
        />
      </Stack>
    </CustomLoadingOverlay>
  );
}
