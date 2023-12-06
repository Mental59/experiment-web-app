import { Select } from '@mantine/core';
import type { ExperimentProjectInfoDto } from '../../../models/experimentTrackers/experimentTrackerInfo.type';

type TestRunnerParamsProps = {
  projects: ExperimentProjectInfoDto[];
  trainRunId: string | null;
  setTrainRunId: (runId: string | null) => void;
};

export function TestRunnerParams({ projects, trainRunId, setTrainRunId }: TestRunnerParamsProps) {
  const runs = projects.flatMap((project) => project.runs);
  const trainRuns = runs.filter((run) => run.run_type === 'train');
  const trainRunIds = trainRuns.map((run) => `${run.run_name} (${run.run_id})`);

  return (
    <Select
      value={trainRunId}
      data={trainRunIds}
      onChange={setTrainRunId}
      placeholder="Выберите обучающий эксперимент"
      label="Обучающий эксперимент"
    />
  );
}
