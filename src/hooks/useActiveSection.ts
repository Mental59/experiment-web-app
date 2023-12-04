import type { ExperimentActiveSection } from '../models/experiment/section.type';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setActiveSection } from '../redux/webAppState/webAppStateSlice';

export const useActiveSection = () => {
  const activeSection = useAppSelector((state) => state.webAppState.activeSection);
  const dispatch = useAppDispatch();

  return {
    activeSection,
    setActiveSection: (_activeSection: ExperimentActiveSection) =>
      dispatch(setActiveSection(_activeSection)),
  };
};
