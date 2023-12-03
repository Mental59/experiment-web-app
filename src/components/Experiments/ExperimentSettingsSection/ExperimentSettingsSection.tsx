import { Divider, Select, Stack, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  setNeptuneApiKey,
  setNeptuneCorrectApiToken,
  setNeptuneCurrentProjectId,
  setNeptuneProjects,
} from '../../../redux/trackerInfo/neptuneTrackerInfoSlice';
import { InputWithButton } from '../../InputWithButton/InputWithButton';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { setSettingsLoading } from '../../../redux/webAppState/webAppStateSlice';
import { getNeptuneTrackerProjects } from '../../../requests/trackerInfo';

export function ExperimentSettingsSection() {
  const settingsLoading = useAppSelector((state) => state.webAppState.settingsLoading);
  const neptuneTrackerInfo = useAppSelector((state) => state.neptuneTrackerInfo);
  const dispatch = useAppDispatch();

  const handleApiTokenChange = (apiToken: string) => {
    dispatch(setNeptuneApiKey(apiToken.trim()));
  };

  const handleApiTokenApply = async () => {
    if (neptuneTrackerInfo.apiToken.trim().length === 0) {
      return;
    }

    dispatch(setSettingsLoading(true));

    try {
      const projects = await getNeptuneTrackerProjects(neptuneTrackerInfo.apiToken);
      dispatch(setNeptuneProjects(projects));

      if (!neptuneTrackerInfo.currentProjectId && projects.length > 0) {
        dispatch(setNeptuneCurrentProjectId(projects[0].project_id));
      }

      dispatch(setNeptuneCorrectApiToken(true));
    } catch (err) {
      dispatch(setNeptuneProjects([]));
      dispatch(setNeptuneCurrentProjectId(null));
      dispatch(setNeptuneCorrectApiToken(false));
    } finally {
      dispatch(setSettingsLoading(false));
    }
  };

  const handleProjectChange = (projectId: string | null) => {
    dispatch(setNeptuneCurrentProjectId(projectId));
  };

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
