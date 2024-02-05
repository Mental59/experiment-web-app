import { TreeData, TreeView } from '../components/TreeView/TreeView';
import { useOntoTreeView } from '../hooks/useOntoTreeView';
import { OntoTreeViewDto } from '../models/ontoParser/treeView.type';

function preprocessOntoTreeView(treeView: OntoTreeViewDto[]): TreeData[] {
  if (treeView.length === 0) {
    return [];
  }

  return treeView.map((value) => ({
    label: value.data.name,
    children: preprocessOntoTreeView(value.children),
  }));
}

export function OntoTreeViewDemoPage() {
  const { ontoParserInfo } = useOntoTreeView();

  return <TreeView tree={preprocessOntoTreeView(ontoParserInfo.treeViewDto)} w={200} />;
}
