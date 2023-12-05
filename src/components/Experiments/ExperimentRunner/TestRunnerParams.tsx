import { useEffect } from 'react';
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
  const trainRunIds = trainRuns.map((run) => run.run_id);

  useEffect(() => {
    if (trainRunId && !trainRunIds.includes(trainRunId)) {
      setTrainRunId(trainRunIds.at(0) ?? null);
    } else if (!trainRunId && trainRunIds.length > 0) {
      setTrainRunId(trainRunIds[0]);
    }
  });

  return (
    <>
      <Select
        value={trainRunId}
        data={trainRunIds}
        onChange={setTrainRunId}
        label="Id обучающего эксперимента"
      />
    </>
  );
}
