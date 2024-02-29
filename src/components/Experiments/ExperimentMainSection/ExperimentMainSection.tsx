import { Tabs } from '@mantine/core';
import { ExperimentMainSectionTab } from '../../../models/experiment/section.type';
import { ExperimentsTab } from '../../Tabs/ExperimentsTab/ExperimentsTab';
import { DatasetsTab } from '../../Tabs/DatasetsTab/DatasetsTab';

export function ExperimentMainSection() {
  return (
    <Tabs variant="outline" defaultValue={ExperimentMainSectionTab.Datasets}>
      <Tabs.List>
        <Tabs.Tab value={ExperimentMainSectionTab.Datasets}>Загрузка наборов данных</Tabs.Tab>
        <Tabs.Tab value={ExperimentMainSectionTab.Experiments}>Запуск экспериментов</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={ExperimentMainSectionTab.Datasets}>
        <DatasetsTab />
      </Tabs.Panel>

      <Tabs.Panel value={ExperimentMainSectionTab.Experiments}>
        <ExperimentsTab />
      </Tabs.Panel>
    </Tabs>
  );
}
