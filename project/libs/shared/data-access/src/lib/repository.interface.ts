import {
  Entity,
  EntityIdType,
} from './entity.interface.js';

export interface Repository<
  T extends Entity<EntityIdType>,
> {
  findById(id: NonNullable<T['id']>): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  deleteById(id: NonNullable<T['id']>): Promise<void>;
}
