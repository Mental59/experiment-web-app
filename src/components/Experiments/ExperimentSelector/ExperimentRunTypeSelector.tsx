import { Center } from '@mantine/core';
import { ExperimentSelectorRunType } from '../../../models/experiment/experimentSelectorRunType.type';
import { GradientSegmentedControl } from '../../GradientSegmentedControl/GradientSegmentedControl';

export type ExperimentRunTypeSelectorProps = {
  runType: ExperimentSelectorRunType;
  setRunType: (runType: ExperimentSelectorRunType) => void;
};
export function ExperimentRunTypeSelector({ runType, setRunType }: ExperimentRunTypeSelectorProps) {
  return (
    <Center>
      <GradientSegmentedControl
        orientation="vertical"
        w={600}
        onChange={(value) => setRunType(value as ExperimentSelectorRunType)}
        value={runType}
        data={Object.values(ExperimentSelectorRunType)}
      />
    </Center>
  );
}
