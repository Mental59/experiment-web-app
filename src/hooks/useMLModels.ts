import { useEffect } from 'react';
import { setOntoMLModels } from '../redux/ontoParser/ontoParserSlice';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { getModels, addTransformerModel } from '../requests/ontoParser';
import {
  getErrorMessageFromException,
  showDefaultNotification,
  showErrorNotification,
} from '../utils/notifier';

export const useMLModels = () => {
  const token = useAppSelector((state) => state.webAppState.token);
  const mlModels = useAppSelector((state) => state.ontoParserInfo.mlModels);
  const dispatch = useAppDispatch();

  const fetchMLModels = async () => {
    const _models = await getModels(token);
    dispatch(setOntoMLModels(_models));
  };

  const addMLModel = async (data: {
    parentNodeId: string;
    nodeName: string;
    modelNameOrPath: string;
  }) => {
    try {
      await addTransformerModel(
        {
          model_name_or_path: data.modelNameOrPath,
          node_name: data.nodeName,
          parent_node_id: data.parentNodeId,
        },
        token
      );
      await fetchMLModels();
      showDefaultNotification('Модель успешно добавлена');
    } catch (err) {
      showErrorNotification(
        `Не удалось добавить задачу; Причина: ${getErrorMessageFromException(err)}`
      );
    }
  };

  useEffect(() => {
    fetchMLModels();
  }, []);

  return { mlModels, addMLModel };
};
