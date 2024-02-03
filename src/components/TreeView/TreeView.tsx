import { Group, GroupProps, NavLink } from '@mantine/core';

export type Tree = {
  label: string;
  children?: Tree[];
};
export type TreeViewProps = GroupProps & { tree: Tree[] };

function createTreeView(tree?: Tree[]) {
  if (!tree || tree.length === 0) {
    return undefined;
  }

  return tree.map((node) => (
    <NavLink label={node.label} childrenOffset={28}>
      {createTreeView(node.children)}
    </NavLink>
  ));
}

export function TreeView({ tree, ...groupProps }: TreeViewProps) {
  return <Group {...groupProps}>{createTreeView(tree)}</Group>;
}
