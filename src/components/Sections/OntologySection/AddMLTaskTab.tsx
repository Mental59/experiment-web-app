import { Button, Center, Select, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useMLTasks } from '../../../hooks/useMLTasks';

export function AddMLTaskTab() {
  const { addMLTask, categories } = useMLTasks();

  const subcategoryPaths = Object.keys(categories).sort((a, b) => a.localeCompare(b));
  const [selectedSubCategoryPath, setSelectedSubCategory] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>('');

  return (
    <Center>
      <Stack mt="xl" mb="xl" w={500}>
        <Select
          data={subcategoryPaths}
          value={selectedSubCategoryPath}
          onChange={(value) => setSelectedSubCategory(value)}
          label="Подкатегория задачи"
          placeholder="Выберите подкатегорию задачи или оставьте пустой"
          allowDeselect
        />
        <TextInput
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value.replaceAll('/', ''))}
          label="Название задачи"
          placeholder="Введите название задачи машинного обучения"
          withAsterisk
        />
        <Button
          disabled={!newTaskName}
          onClick={() =>
            addMLTask({
              newNodeName: newTaskName,
              parentNodeId: selectedSubCategoryPath
                ? categories[selectedSubCategoryPath]?.at(-1)
                : undefined,
            })
          }
        >
          Добавить новую задачу
        </Button>
      </Stack>
    </Center>
  );
}
