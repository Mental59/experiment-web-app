import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  setNeptuneApiKey,
  setNeptuneCorrectApiToken,
  setNeptuneProjects,
  setNeptuneProjectsLoaded,
} from '../redux/trackerInfo/neptuneTrackerInfoSlice';
import { setSettingsLoading } from '../redux/webAppState/webAppStateSlice';
import { checkNeptuneApiToken } from '../requests/trackerInfo';

export const useExperimentSettings = () => {
  const settingsLoading = useAppSelector((state) => state.webAppState.settingsLoading);
  const neptuneCorrectApiToken = useAppSelector(
    (state) => state.neptuneTrackerInfo.correctApiToken
  );
  const neptuneApiToken = useAppSelector((state) => state.neptuneTrackerInfo.apiToken);
  const dispatch = useAppDispatch();

  const handleApiTokenChange = (apiToken: string) => {
    dispatch(setNeptuneApiKey(apiToken.trim()));
  };

  const handleApiTokenApply = async () => {
    if (neptuneApiToken.trim().length === 0) {
      return;
    }

    dispatch(setSettingsLoading(true));

    const isTokenCorrect = await checkNeptuneApiToken(neptuneApiToken);
    dispatch(setNeptuneCorrectApiToken(isTokenCorrect));
    dispatch(setNeptuneProjectsLoaded(false));
    dispatch(setNeptuneProjects([]));

    dispatch(setSettingsLoading(false));
  };

  return {
    handleApiTokenChange,
    handleApiTokenApply,
    settingsLoading,
    neptuneCorrectApiToken,
    neptuneApiToken,
  };
};
