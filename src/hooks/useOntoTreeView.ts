import { useEffect } from 'react';
import { setOntoTreeViewDto, setOntoTreeViewLoading } from '../redux/ontoParser/ontoParserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getOntoTreeView } from '../requests/ontoParser';

export const useOntoTreeView = () => {
  const ontoParserInfo = useAppSelector((state) => state.ontoParserInfo);
  const dispatch = useAppDispatch();

  const fetchOntoTreeView = async () => {
    dispatch(setOntoTreeViewLoading(true));
    const treeViewDto = await getOntoTreeView();
    dispatch(setOntoTreeViewDto(treeViewDto));
    dispatch(setOntoTreeViewLoading(false));
  };

  // TODO: Data might be fetched multiple times
  useEffect(() => {
    fetchOntoTreeView();
  }, []);

  return { ontoParserInfo };
};
