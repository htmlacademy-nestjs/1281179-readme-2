import { EntityIdType } from "./entity.interface.js";

export class EntityAlreadyExistsError extends Error {
  constructor(public readonly entityId: EntityIdType) {
    super(`Entity already exists: ${entityId}`);
    this.name = 'EntityAlreadyExistsError';
  }
}
