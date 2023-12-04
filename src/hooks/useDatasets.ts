import { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setDatasets } from '../redux/trackerInfo/experimentApiSlice';
import { setDatasetsLoaded, setDatasetsLoading } from '../redux/webAppState/webAppStateSlice';
import { getDatasets, uploadDatasets } from '../requests/datasets';

export const useDatasetsUpload = () => {
  const datasetsLoading = useAppSelector((state) => state.webAppState.datasetsLoading);
  const dispatch = useAppDispatch();

  const handleFilesDrop = async (files: FileWithPath[]) => {
    try {
      dispatch(setDatasetsLoading(true));

      const _datasets = await uploadDatasets(files);

      notifications.show({
        title: 'Загрузка наборов данных',
        message: 'Наборы данных успешно загружены',
      });

      dispatch(setDatasets(_datasets));
      dispatch(setDatasetsLoaded(true));
    } catch (err) {
      const axiosErr = err as AxiosError;

      notifications.show({
        title: 'Загрузка наборов данных',
        message: `Ошибка при загрузке: ${axiosErr.message}`,
        color: 'red',
      });
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
  const dispatch = useAppDispatch();

  const fetchDatasets = async () => {
    if (datasetsLoaded) {
      return;
    }

    const _datasets = await getDatasets();

    dispatch(setDatasets(_datasets));
    dispatch(setDatasetsLoaded(true));
  };

  return { datasets, fetchDatasets };
};
