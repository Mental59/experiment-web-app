import { Checkbox, NumberInput, NumberInputProps, Select, Slider, Text } from '@mantine/core';
import { ExperimentMLModel } from '../../../models/experimentRunner/experimentModel';
import { type ExperimentInfo } from '../../../redux/experimentInfo/experimentInfoSlice';
import { clamp } from '../../../utils/math';
import { useAppSelector } from '../../../redux/store';

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

function CustomNumberInput({
  setFunc,
  ...props
}: NumberInputProps & { setFunc: (value: number) => void }) {
  return (
    <NumberInput
      onChange={(value) => setFunc(clamp(Number(value), props.min, props.max))}
      {...props}
    />
  );
}

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
  const sourceCodeModels = useAppSelector((state) => state.ontoParserInfo.sourceCodeModels);
  const modelNames = sourceCodeModels.map((model) => model.name);

  return (
    <>
      <Select
        label="Модель"
        // onChange={(value) => setMLModel(value as ExperimentMLModel)}
        // value={experimentInfo.model}
        data={modelNames}
        allowDeselect={false}
        placeholder="Выберите модель"
        withAsterisk
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
      <CustomNumberInput
        value={experimentInfo.embeddingDim}
        min={1}
        max={2048}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        setFunc={setEmbeddingDim}
        label="Размерность эмбеддинга (1-2048)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.hiddenDim}
        min={1}
        max={2048}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        setFunc={setHiddenDim}
        label="Размерность скрытого слоя (1-2048)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.batchSize}
        min={1}
        max={16384}
        step={10}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        setFunc={setBatchSize}
        label="Размерность батча (1-16384)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.numEpochs}
        min={1}
        max={10000}
        step={5}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        setFunc={setNumEpochs}
        label="Количество эпох (1-10000)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.learningRate}
        min={0}
        max={100}
        step={0.001}
        clampBehavior="strict"
        decimalScale={7}
        allowNegative={false}
        fixedDecimalScale
        setFunc={setLearningRate}
        label="Скорость обучения (0-100)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.schedulerFactor}
        min={0}
        max={100}
        step={0.01}
        clampBehavior="strict"
        decimalScale={4}
        allowNegative={false}
        fixedDecimalScale
        setFunc={setSchedulerFactor}
        label="Фактор планировщика (0-100)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.schedulerPatience}
        min={1}
        max={100}
        step={2}
        clampBehavior="strict"
        allowNegative={false}
        allowDecimal={false}
        setFunc={setSchedulerPatience}
        label="Терпение планировщика (1-100)"
        withAsterisk
      />
      <CustomNumberInput
        value={experimentInfo.weightDecay}
        min={0}
        max={100}
        step={0.001}
        clampBehavior="strict"
        decimalScale={7}
        allowNegative={false}
        fixedDecimalScale
        setFunc={setWeightDecay}
        label="Регуляризация (0-100)"
        withAsterisk
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
