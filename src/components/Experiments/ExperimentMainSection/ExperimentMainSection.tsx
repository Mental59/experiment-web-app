import { Tabs } from '@mantine/core';
import { useAppSelector } from '../../../redux/store';

export function ExperimentMainSection() {
  const neptuneTrackerInfo = useAppSelector((state) => state.neptuneTrackerInfo);
  const mlflowTrackerInfo = useAppSelector((state) => state.mlflowTrackerInfo);

  console.log(neptuneTrackerInfo);
  console.log(mlflowTrackerInfo);

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
