import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  setNeptuneApiKey,
  setNeptuneCorrectApiToken,
  setNeptuneCurrentProjectId,
  setNeptuneProjects,
} from '../redux/trackerInfo/neptuneTrackerInfoSlice';
import { setSettingsLoading } from '../redux/webAppState/webAppStateSlice';
import { getNeptuneTrackerProjects } from '../requests/trackerInfo';

export const useExperimentSettings = () => {
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

  return {
    handleApiTokenChange,
    handleApiTokenApply,
    handleProjectChange,
    settingsLoading,
    neptuneTrackerInfo,
  };
};
