export type SourceCodeLibrary = {
  id: string;
  name: string;
};

export type SourceCodeModelDto = {
  id: string;
  name: string;
  libraries: SourceCodeLibrary[];
};
