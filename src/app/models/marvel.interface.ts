export interface IOption {
  readonly limit: number;
  offset: number;
  nameStartsWith?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  count: number;
  readonly maxSize: number;
}

export interface Character {
  name: string;
  picture: string;
}
