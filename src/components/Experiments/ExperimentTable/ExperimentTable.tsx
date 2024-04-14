import { useState } from 'react';
import { Table, Checkbox, ScrollArea, List } from '@mantine/core';
import cx from 'clsx';
import { useOntoTreeView } from '../../../hooks/useOntoTreeView';
import classes from './ExperimentTable.module.css';
import { ExperimentParametersDto } from '../../../models/ontoParser/experimentMetadata.type';

const headers = [
  'Автор',
  'ID проекта',
  'ID эксперимента',
  'Название эксперимента',
  'Трекер',
  'Модель',
  'Набор данных',
  'Время запуска',
  'Метрики',
  'Параметры',
].map((header, index) => <Table.Th key={index}>{header}</Table.Th>);

export function ExperimentTable() {
  const { getExperiments, setExperimentParametersFromMetadata } = useOntoTreeView();
  const experiments = getExperiments();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const rows = experiments.map((experiment) => {
    const experimentId = experiment.tracker_info.run_id;

    return (
      <Table.Tr
        key={experimentId}
        bg={selectedRows.includes(experimentId) ? 'var(--mantine-color-blue-light)' : undefined}
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(experimentId)}
            onChange={(event) => {
              setSelectedRows(
                event.currentTarget.checked
                  ? [experimentId]
                  : selectedRows.filter((position) => position !== experimentId)
              );
              setExperimentParametersFromMetadata(experiment);
            }}
          />
        </Table.Td>
        <Table.Td>{experiment.author.login}</Table.Td>
        <Table.Td>{experiment.tracker_info.project_id}</Table.Td>
        <Table.Td>{experiment.tracker_info.run_id}</Table.Td>
        <Table.Td>{experiment.tracker_info.run_name}</Table.Td>
        <Table.Td>{experiment.tracker_info.experiment_tracker}</Table.Td>
        <Table.Td>{experiment.parameters.model_name}</Table.Td>
        <Table.Td>{experiment.parameters.dataset}</Table.Td>
        <Table.Td>{experiment.time}</Table.Td>
        <Table.Td miw={150}>
          <List>
            <List.Item>Accuracy: {experiment.metrics.accuracy.toFixed(3)}</List.Item>
            <List.Item>F1-score: {experiment.metrics.f1_weighted.toFixed(3)}</List.Item>
            <List.Item>Precision: {experiment.metrics.precision_weighted.toFixed(3)}</List.Item>
            <List.Item>Recall: {experiment.metrics.recall_weighted.toFixed(3)}</List.Item>
            <List.Item>Confidence: {experiment.metrics.confidence.toFixed(3)}</List.Item>
          </List>
        </Table.Td>
        <Table.Td>
          <List>
            {Object.keys(experiment.parameters).map((key) => {
              const text = `${key}: ${experiment.parameters[key as keyof ExperimentParametersDto]}`;
              return <List.Item key={key}>{text}</List.Item>;
            })}
          </List>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th />
            {headers}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
