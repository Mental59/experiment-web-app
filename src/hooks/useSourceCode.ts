import { FileWithPath } from '@mantine/dropzone';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSourceCodeLoading } from '../redux/webAppState/webAppStateSlice';
import {
  showDefaultNotification,
  showErrorNotification,
  showWarningNotification,
} from '../utils/notifier';
import { findModelsInSourceCode } from '../requests/ontoParser';
import { setSourceCodeModels } from '../redux/ontoParser/ontoParserSlice';

export const useSourceCodeUpload = (onFilesUploaded?: () => void) => {
  const sourceCodeLoading = useAppSelector((state) => state.webAppState.sourceCodeLoading);
  const dispatch = useAppDispatch();

  const handleFilesDrop = async (files: FileWithPath[]) => {
    try {
      dispatch(setSourceCodeLoading(true));

      const models = await findModelsInSourceCode(files);
      dispatch(setSourceCodeModels(models));

      const message = `Найдены модели: ${models.length}`;
      if (models.length === 0) {
        showWarningNotification(message);
      } else {
        showDefaultNotification(message);
      }

      if (onFilesUploaded) onFilesUploaded();
    } catch (err) {
      const axiosErr = err as AxiosError;
      showErrorNotification(`Ошибка при загрузке: ${axiosErr.message}`);
    } finally {
      dispatch(setSourceCodeLoading(false));
    }
  };

  return { sourceCodeLoading, handleFilesDrop };
};
