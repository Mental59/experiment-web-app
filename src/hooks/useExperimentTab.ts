import { useState } from 'react';
import { setSourceCodeModels } from '../redux/ontoParser/ontoParserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clamp } from '../utils/math';

export const useExperimentTab = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => clamp(current + 1, 0, 1));
  const prevStep = () => setActive((current) => clamp(current - 1, 0, 1));

  const sourceCodeModels = useAppSelector((state) => state.ontoParserInfo.sourceCodeModels);
  const dispatch = useAppDispatch();

  const clearSourceCodeModels = () => {
    dispatch(setSourceCodeModels([]));
  };

  const handleBackButton = () => {
    prevStep();
    clearSourceCodeModels();
  };
  const handleNextButton = () => {
    nextStep();
  };

  return { sourceCodeModels, handleBackButton, handleNextButton, active };
};
