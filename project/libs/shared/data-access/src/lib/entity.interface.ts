export type EntityIdType = string | number;

export interface Entity<T extends EntityIdType> {
  id?: T;
}
