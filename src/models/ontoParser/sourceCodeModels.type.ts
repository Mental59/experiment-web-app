export type SourceCodeLibraryDto = {
  id: string;
  name: string;
};

export type SourceCodeModelAttributesDto = {
  branch?: string;
  leaf?: boolean;
  id?: string;
  model_name_or_path?: string;
  transformer?: boolean;
};

export type SourceCodeModelTaskDto = {
  id: string;
  name: string;
};

export type SourceCodeModelDto = {
  id: string;
  name: string;
  attributes: SourceCodeModelAttributesDto;
  libraries: SourceCodeLibraryDto[];
  tasks: SourceCodeModelTaskDto[];
  combination_1?: SourceCodeModelDto;
  combination_2?: SourceCodeModelDto;
};
