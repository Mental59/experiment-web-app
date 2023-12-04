import { Tabs } from '@mantine/core';
import { DatasetUploader } from '../DatasetUploader/DatasetUploader';
import { ExperimentRunner } from '../ExperimentRunner/ExperimentRunner';
import { ExperimentMainSectionTab } from '../../../models/experiment/section.type';

export function ExperimentMainSection() {
  return (
    <Tabs variant="outline" defaultValue={ExperimentMainSectionTab.Datasets}>
      <Tabs.List>
        <Tabs.Tab value={ExperimentMainSectionTab.Datasets}>Загрузка наборов данных</Tabs.Tab>
        <Tabs.Tab value={ExperimentMainSectionTab.Runner}>Запуск экспериментов</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={ExperimentMainSectionTab.Datasets}>
        <DatasetUploader />
      </Tabs.Panel>

      <Tabs.Panel value={ExperimentMainSectionTab.Runner}>
        <ExperimentRunner />
      </Tabs.Panel>
    </Tabs>
  );
}
