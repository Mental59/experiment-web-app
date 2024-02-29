import { TreeData, TreeView } from '../TreeView/TreeView';
import { useOntoTreeView } from '../../hooks/useOntoTreeView';
import { OntoTreeViewDto } from '../../models/ontoParser/treeView.type';

function preprocessOntoTreeView(treeView: OntoTreeViewDto[]): TreeData[] {
  if (treeView.length === 0) {
    return [];
  }

  return treeView.map((value) => ({
    key: value.data.id,
    label: value.data.name,
    children: preprocessOntoTreeView(value.children),
  }));
}

export function OntoTreeView() {
  const { ontoParserInfo } = useOntoTreeView();

  return <TreeView tree={preprocessOntoTreeView(ontoParserInfo.treeViewDto)} w={200} />;
}
