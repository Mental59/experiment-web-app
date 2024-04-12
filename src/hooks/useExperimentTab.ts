import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { clamp } from '../utils/math';
import { ExperimentSelectorRunType } from '../models/experiment/experimentSelectorRunType.type';
import { setAllowedExperimentModels } from '../redux/experimentInfo/experimentInfoSlice';
import { ExperimentMLModel } from '../models/experimentRunner/experimentModel';

export const useExperimentTab = ({ numSteps }: { numSteps: number }) => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => clamp(current + 1, 0, numSteps - 1));
  const prevStep = () => setActive((current) => clamp(current - 1, 0, numSteps - 1));
  const [runType, setRunType] = useState(ExperimentSelectorRunType.Empty);

  const dispatch = useAppDispatch();

  const clearAllowedExperimentModels = () => {
    dispatch(setAllowedExperimentModels([]));
  };
  const allowAllModels = () => {
    dispatch(setAllowedExperimentModels(Object.values(ExperimentMLModel)));
  };

  const handleBackButton = () => {
    prevStep();
  };
  const handleNextButton = () => {
    nextStep();
  };

  useEffect(() => {
    if (runType === ExperimentSelectorRunType.Empty) {
      allowAllModels();
    } else {
      clearAllowedExperimentModels();
    }
  }, [runType]);

  return { handleBackButton, handleNextButton, active, runType, setRunType };
};
