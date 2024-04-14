import { useEffect } from 'react';
import { setOntoTreeViewDto, setOntoTreeViewLoading } from '../redux/ontoParser/ontoParserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getOntoTreeView } from '../requests/ontoParser';
import { ExperimentMetadataDto } from '../models/ontoParser/experimentMetadata.type';
import { setExperimentParameters } from '../redux/experimentInfo/experimentInfoSlice';

export const useOntoTreeView = () => {
  const ontoParserInfo = useAppSelector((state) => state.ontoParserInfo);
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const fetchOntoTreeView = async () => {
    dispatch(setOntoTreeViewLoading(true));
    const treeViewDto = await getOntoTreeView(token);
    dispatch(setOntoTreeViewDto(treeViewDto));
    dispatch(setOntoTreeViewLoading(false));
  };

  const getExperiments = (): ExperimentMetadataDto[] => {
    if (ontoParserInfo.treeViewDto.length === 0) {
      return [];
    }

    const experimentNode = ontoParserInfo.treeViewDto.find(
      (node) => node.data.name === 'Experiment'
    );

    return (
      experimentNode?.children.map((node) => node.data.attributes as ExperimentMetadataDto) ?? []
    );
  };

  const setExperimentParametersFromMetadata = (experiment: ExperimentMetadataDto) => {
    dispatch(setExperimentParameters(experiment));
  };

  // TODO: Data might be fetched multiple times
  useEffect(() => {
    fetchOntoTreeView();
  }, []);

  return { ontoParserInfo, getExperiments, setExperimentParametersFromMetadata };
};
