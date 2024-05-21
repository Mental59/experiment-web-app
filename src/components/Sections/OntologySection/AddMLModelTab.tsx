import { Center, Stack, Select, TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import { useMLTasks } from '../../../hooks/useMLTasks';
import { useMLModels } from '../../../hooks/useMLModels';

export function AddMLModelTab() {
  const { categories } = useMLTasks();
  const { addMLModel } = useMLModels();

  const subcategoryPaths = Object.keys(categories).sort((a, b) => a.localeCompare(b));
  const [selectedSubCategoryPath, setSelectedSubCategory] = useState<string | null>(null);
  const [newModelName, setNewTaskName] = useState<string>('');
  const [modelNameOrPath, setModelNameOrPath] = useState<string>('');

  return (
    <Center>
      <Stack mt="xl" mb="xl" w={500}>
        <Select
          data={subcategoryPaths}
          value={selectedSubCategoryPath}
          onChange={(value) => setSelectedSubCategory(value)}
          label="Категория задачи машинного обучения"
          placeholder="Выберите категорию задачи машинного обучения"
          withAsterisk
          allowDeselect={false}
        />
        <TextInput
          value={newModelName}
          onChange={(event) => setNewTaskName(event.target.value.replaceAll('/', ''))}
          label="Название модели"
          placeholder="Введите название модели"
          withAsterisk
        />
        <TextInput
          value={modelNameOrPath}
          onChange={(event) => setModelNameOrPath(event.target.value)}
          label="Название модели-трансформера"
          placeholder="Введите название модели с сайта https://huggingface.co/"
          withAsterisk
        />
        <Button
          disabled={!newModelName || !selectedSubCategoryPath || !modelNameOrPath}
          onClick={() =>
            addMLModel({
              parentNodeId: selectedSubCategoryPath
                ? categories[selectedSubCategoryPath]?.at(-1) ?? ''
                : '',
              nodeName: newModelName,
              modelNameOrPath,
            })
          }
        >
          Добавить модель
        </Button>
      </Stack>
    </Center>
  );
}
