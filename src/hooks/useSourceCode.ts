import { FileWithPath } from '@mantine/dropzone';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSourceCodeLoading } from '../redux/webAppState/webAppStateSlice';
import {
  getErrorMessageFromException,
  showDefaultNotification,
  showErrorNotification,
  showWarningNotification,
} from '../utils/notifier';
import { findModelsInSourceCode } from '../requests/ontoParser';
import { setAllowedExperimentModels } from '../redux/experimentInfo/experimentInfoSlice';
import { ExperimentMLModel } from '../models/experimentRunner/experimentModel';

export const useSourceCodeUpload = (onFilesUploaded?: () => void) => {
  const sourceCodeLoading = useAppSelector((state) => state.webAppState.sourceCodeLoading);
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const handleFilesDrop = async (files: FileWithPath[]) => {
    try {
      dispatch(setSourceCodeLoading(true));

      const models = await findModelsInSourceCode(files, token);
      dispatch(setAllowedExperimentModels(models.map((model) => model.name as ExperimentMLModel)));

      const message = `Найдены модели: ${models.length}`;
      if (models.length === 0) {
        showWarningNotification(message);
      } else {
        showDefaultNotification(message);
      }

      if (onFilesUploaded) onFilesUploaded();
    } catch (err) {
      showErrorNotification(`Ошибка при загрузке: ${getErrorMessageFromException(err)}`);
    } finally {
      dispatch(setSourceCodeLoading(false));
    }
  };

  return { sourceCodeLoading, handleFilesDrop };
};
