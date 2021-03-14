export interface IOrderedMap<T> {
  ids: string[];
  elements: { [key: string]: T };
}
