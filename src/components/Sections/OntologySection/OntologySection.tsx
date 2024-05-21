import { Tabs } from '@mantine/core';
import { AddMLModelTab } from './AddMLModelTab';
import { AddMLTaskTab } from './AddMLTaskTab';

export const OntologySectionTab = {
  AddMLModelTab: 'AddMLModelTab',
  AddMLTaskTab: 'AddMLTaskTab',
} as const;

export function OntologySection() {
  return (
    <Tabs variant="outline" defaultValue={OntologySectionTab.AddMLModelTab}>
      <Tabs.List>
        <Tabs.Tab value={OntologySectionTab.AddMLTaskTab}>Добавление новой задачи</Tabs.Tab>
        <Tabs.Tab value={OntologySectionTab.AddMLModelTab}>Добавление новой модели</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={OntologySectionTab.AddMLTaskTab}>
        <AddMLTaskTab />
      </Tabs.Panel>

      <Tabs.Panel value={OntologySectionTab.AddMLModelTab}>
        <AddMLModelTab />
      </Tabs.Panel>
    </Tabs>
  );
}
