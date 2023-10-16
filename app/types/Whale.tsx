type Size = {
  gender: string;
  length: number;
  _id: string;
};

export type Whale = {
  _id: string;
  name: string;
  otherNames: Array<string>;
  scientificName: string;
  sizes: Array<Size>;
  curiosities: Array<string>;
};