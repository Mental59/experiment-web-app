export type OntologyBaseAttributes = {
  branch?: string;
  leaf?: boolean;
};

export type OntologyMLModelAttributes = {
  id?: string;
  model_name_or_path?: string;
  transformer?: boolean;
} & OntologyBaseAttributes;

export type OntologyNodeDto<T> = {
  attributes: T;
  id: string;
  name: string;
};
