import { Select } from '@mantine/core';
import { useMLModels } from '../../../hooks/useMLModels';

export function TestRunnerParamsForUserModel() {
  const { mlModels, selectedMLModel, setSelectedUserMLModelNameOrPath } = useMLModels();
  const userModels = mlModels.filter(
    (model) => !!model.attributes.transformer && !!model.attributes.model_name_or_path
  );

  return (
    <Select
      value={selectedMLModel}
      data={userModels
        .map((model) => model.attributes.model_name_or_path as string)
        .filter((value, index, arr) => arr.indexOf(value) === index)}
      onChange={setSelectedUserMLModelNameOrPath}
      placeholder="Выберите загруженную модель"
      label="Загруженная модель"
      withAsterisk
      allowDeselect={false}
    />
  );
}
