import { randomUUID } from "node:crypto";
import { Entity, EntityIdType } from "./entity.interface.js";
import { Repository } from "./repository.interface.js";
import { EntityAlreadyExistsError } from "./entity-already-exists.error.js";
import { EntityNotFoundError } from "./entity-not-found.error.js";
import { EntityNoIdError } from "./entity-no-id.error.js";

export abstract class BaseMemoryRepository<T extends Entity<EntityIdType>> implements Repository<T> {

  protected entities: Map<NonNullable<T['id']>, T> = new Map();

  public async findById(id: NonNullable<T["id"]>): Promise<T | null> {
    return this.entities.get(id) ?? null;
  }

  /**
   * @throws {EntityAlreadyExistsError} Entity already exists.
   */
  public async save(entity: T): Promise<T> {
    if (entity.id) {
      throw new EntityAlreadyExistsError(entity.id);
    }

    entity.id = randomUUID();
    this.entities.set(entity.id, entity);
    return entity;
  }

  /**
   * @throws {EntityNoIdError} Entity has no id.
   * @throws {EntityNotFoundError} Entity does not exist.
   */
  public async update(entity: T): Promise<T> {
    if (!entity.id) {
      throw new EntityNoIdError();
    }

    if (!this.entities.get(entity.id)) {
      throw new EntityNotFoundError(entity.id);
    }

    this.entities.set(entity.id, entity);
    return entity;
  }

  public async deleteById(id: NonNullable<T["id"]>): Promise<void> {
    this.entities.delete(id);
  }
}
