import { FileWithPath } from '@mantine/dropzone';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setDatasets } from '../redux/trackerInfo/experimentApiSlice';
import { setDatasetsLoaded, setDatasetsLoading } from '../redux/webAppState/webAppStateSlice';
import { getDatasets, uploadDatasets } from '../requests/datasets';
import { showDefaultNotification, showErrorNotification } from '../utils/notifier';

export const useDatasetsUpload = () => {
  const datasetsLoading = useAppSelector((state) => state.webAppState.datasetsLoading);
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const handleFilesDrop = async (files: FileWithPath[]) => {
    try {
      dispatch(setDatasetsLoading(true));

      const _datasets = await uploadDatasets(files, token);

      showDefaultNotification('Наборы данных успешно загружены');

      dispatch(setDatasets(_datasets));
      dispatch(setDatasetsLoaded(true));
    } catch (err) {
      const axiosErr = err as AxiosError;
      showErrorNotification(`Ошибка при загрузке: ${axiosErr.message}`);
    } finally {
      dispatch(setDatasetsLoading(false));
    }
  };

  return {
    datasetsLoading,
    handleFilesDrop,
  };
};

export const useDatasets = () => {
  const datasets = useAppSelector((state) => state.experimentApiInfo.datasets);
  const datasetsLoaded = useAppSelector((state) => state.webAppState.datasetsLoaded);
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const fetchDatasets = async () => {
    // TODO: data might be fetched several times
    if (datasetsLoaded) {
      return;
    }

    const _datasets = await getDatasets(token);

    dispatch(setDatasets(_datasets));
    dispatch(setDatasetsLoaded(true));
  };

  return { datasets, fetchDatasets };
};
