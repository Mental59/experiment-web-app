import { useEffect } from 'react';
import { setOntoMLTasks } from '../redux/ontoParser/ontoParserSlice';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { getMLTasks, addMLTask } from '../requests/ontoParser';
import { OntologyBaseAttributes, OntologyNodeDto } from '../models/ontoParser/ontoNodeDto.type';
import {
  getErrorMessageFromException,
  showDefaultNotification,
  showErrorNotification,
} from '../utils/notifier';

const createCategories = (tasks: OntologyNodeDto<OntologyBaseAttributes>[][]) => {
  const categories: Record<string, string[]> = {};

  tasks.forEach((category) => {
    for (let i = category.length; i > 0; i -= 1) {
      const _path = category
        .slice(0, i)
        .map((val) => val.name)
        .join('/');
      const _ids = category.slice(0, i).map((val) => val.id);

      categories[_path] = _ids;
    }
  });

  return categories;
};

export const useMLTasks = () => {
  const token = useAppSelector((state) => state.webAppState.token);
  const mlTasks = useAppSelector((state) => state.ontoParserInfo.mlTasks);
  const dispatch = useAppDispatch();

  const fetchMLTasks = async () => {
    const _tasks = await getMLTasks(token);
    dispatch(setOntoMLTasks(_tasks));
  };

  const _addMLTask = async (data: { newNodeName: string; parentNodeId?: string }) => {
    try {
      await addMLTask(
        { new_node_name: data.newNodeName, parent_node_id: data.parentNodeId },
        token
      );
      await fetchMLTasks();
      showDefaultNotification('Задача успешно добавлена');
    } catch (err) {
      showErrorNotification(`Не удалось добавить задачу: ${getErrorMessageFromException(err)}`);
    }
  };

  useEffect(() => {
    fetchMLTasks();
  }, []);

  return { mlTasks, addMLTask: _addMLTask, categories: createCategories(mlTasks) };
};
