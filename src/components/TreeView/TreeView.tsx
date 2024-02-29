import { Group, GroupProps, NavLink } from '@mantine/core';

export type TreeData = {
  label: string;
  key: string;
  children?: TreeData[];
};
export type TreeViewProps = GroupProps & { tree: TreeData[] };

function createTreeView(tree?: TreeData[]) {
  if (!tree || tree.length === 0) {
    return undefined;
  }

  return tree.map((node) => (
    <NavLink label={node.label} childrenOffset={28} key={node.key}>
      {createTreeView(node.children)}
    </NavLink>
  ));
}

export function TreeView({ tree, ...groupProps }: TreeViewProps) {
  return <Group {...groupProps}>{createTreeView(tree)}</Group>;
}
