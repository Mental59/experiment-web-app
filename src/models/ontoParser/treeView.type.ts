export type OntoTreeViewDto = {
  data: {
    id: string;
    name: string;
  };
  children: OntoTreeViewDto[];
};
