import { Checkbox, NumberInput, Select, Slider, Text } from '@mantine/core';
import { ExperimentMLModel } from '../../../models/experimentRunner/experimentModel';
import { type ExperimentInfo } from '../../../redux/experimentInfo/experimentInfoSlice';

type TrainRunnerProps = {
  experimentInfo: ExperimentInfo;
  setMLModel: (model: ExperimentMLModel) => void;
  setEmbeddingDim: (embeddingDim: number) => void;
  setHiddenDim: (hiddenDim: number) => void;
  setBatchSize: (batchSize: number) => void;
  setNumEpochs: (numEpochs: number) => void;
  setLearningRate: (learningRate: number) => void;
  setSchedulerFactor: (factor: number) => void;
  setSchedulerPatience: (patience: number) => void;
  setWeightDecay: (weightDecay: number) => void;
  setCaseSensitive: (caseSensitive: boolean) => void;
  setTestSize: (testSize: number) => void;
  setNum2words: (num2words: boolean) => void;
};

export function TrainRunnerParams({
  experimentInfo,
  setBatchSize,
  setCaseSensitive,
  setEmbeddingDim,
  setMLModel,
  setHiddenDim,
  setLearningRate,
  setNum2words,
  setNumEpochs,
  setSchedulerFactor,
  setSchedulerPatience,
  setTestSize,
  setWeightDecay,
}: TrainRunnerProps) {
  const setFromNumberInput = (value: string | number, setter: (value: number) => void) => {
    console.log(Number(value));
  };

  return (
    <>
      <Select
        label="Модель"
        onChange={(value) => setMLModel(value as ExperimentMLModel)}
        value={experimentInfo.model}
        data={Object.values(ExperimentMLModel)}
        placeholder="Выберите модель"
      />
      <Checkbox
        checked={experimentInfo.caseSensitive}
        onChange={() => setCaseSensitive(!experimentInfo.caseSensitive)}
        label="Учитывать регистр при построении словаря?"
      />
      <Checkbox
        checked={experimentInfo.num2words}
        onChange={() => setNum2words(!experimentInfo.num2words)}
        label="Использовать метод num2words?"
      />
      <NumberInput
        defaultValue={experimentInfo.embeddingDim}
        min={1}
        max={2048}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        onChange={(value) => setFromNumberInput(value, setEmbeddingDim)}
        label="Размерность эмбеддинга (1-2048)"
      />
      <NumberInput
        defaultValue={experimentInfo.hiddenDim}
        min={1}
        max={2048}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        onChange={(value) => setFromNumberInput(value, setHiddenDim)}
        label="Размерность скрытого слоя (1-2048)"
      />
      <NumberInput
        defaultValue={experimentInfo.batchSize}
        min={1}
        max={16384}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        onChange={(value) => setFromNumberInput(value, setBatchSize)}
        label="Размерность батча (1-16384)"
      />
      <NumberInput
        defaultValue={experimentInfo.numEpochs}
        min={1}
        max={10000}
        step={5}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        onChange={(value) => setFromNumberInput(value, setNumEpochs)}
        label="Количество эпох (1-10000)"
      />
      <NumberInput
        defaultValue={experimentInfo.learningRate}
        min={0}
        max={100}
        step={0.001}
        clampBehavior="strict"
        decimalScale={7}
        allowNegative={false}
        fixedDecimalScale
        onChange={(value) => setFromNumberInput(value, setLearningRate)}
        label="Скорость обучения (0-100)"
      />
      <NumberInput
        defaultValue={experimentInfo.schedulerFactor}
        min={0}
        max={100}
        step={0.01}
        clampBehavior="strict"
        decimalScale={4}
        allowNegative={false}
        fixedDecimalScale
        onChange={(value) => setFromNumberInput(value, setSchedulerFactor)}
        label="Фактор планировщика (0-100)"
      />
      <NumberInput
        defaultValue={experimentInfo.schedulerPatience}
        min={1}
        max={100}
        step={2}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        onChange={(value) => setFromNumberInput(value, setSchedulerPatience)}
        label="Терпение планировщика (1-100)"
      />
      <NumberInput
        defaultValue={experimentInfo.weightDecay}
        min={0}
        max={100}
        step={0.001}
        clampBehavior="strict"
        decimalScale={7}
        allowNegative={false}
        fixedDecimalScale
        onChange={(value) => setFromNumberInput(value, setWeightDecay)}
        label="Регуляризация (0-100)"
      />
      <Text>Размер тестовой выборки</Text>
      <Slider
        defaultValue={experimentInfo.testSize}
        showLabelOnHover
        min={0.05}
        max={0.95}
        step={0.05}
        onChangeEnd={setTestSize}
      />
    </>
  );
}
