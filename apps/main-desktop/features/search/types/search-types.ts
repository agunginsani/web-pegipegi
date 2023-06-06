export type LocationSearchItem<T = {}> = {
  title: string;
  description?: string;
  icon?: string;
  type?: string;
  child?: Array<LocationSearchItem<T>>;
  value: string;
  payload?: T;
};

export type LocationSearchSelection<T = {}> = {
  label: string;
  value: string;
  payload?: T;
};
