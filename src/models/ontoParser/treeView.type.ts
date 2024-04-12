export type OntoTreeViewNodeDto = {
  id: string;
  name: string;
  namespace: string;
  attributes: Record<string, any>;
};

export type OntoTreeViewDto = {
  data: OntoTreeViewNodeDto;
  children: OntoTreeViewDto[];
};
