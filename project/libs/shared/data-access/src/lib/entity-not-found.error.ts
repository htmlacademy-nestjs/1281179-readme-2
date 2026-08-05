import { EntityIdType } from "./entity.interface.js";

export class EntityNotFoundError extends Error {
  constructor(public readonly entityId: EntityIdType) {
    super(`Entity not found: ${entityId}`);
    this.name = 'EntityNotFoundError';
  }
}
