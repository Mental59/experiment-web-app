import { Tabs } from '@mantine/core';

export function ExperimentMainSection() {
  return (
    <Tabs variant="outline" defaultValue="datasets">
      <Tabs.List>
        <Tabs.Tab value="datasets">Загрузка наборов данных</Tabs.Tab>
        <Tabs.Tab value="train">Запуск обучения</Tabs.Tab>
        <Tabs.Tab value="test">Запуск тестирования</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="datasets">Content1</Tabs.Panel>

      <Tabs.Panel value="train">Content2</Tabs.Panel>

      <Tabs.Panel value="test">Content3</Tabs.Panel>
    </Tabs>
  );
}
