export * from './lib/base-memory.repository.js';
export { EntityAlreadyExistsError } from './lib/entity-already-exists.error.js';
export { EntityNotFoundError } from './lib/entity-not-found.error.js';
export { EntityNoIdError } from './lib/entity-no-id.error.js';
export type {
  EntityIdType,
  Entity,
} from './lib/entity.interface.js';
export type { Repository } from './lib/repository.interface.js';
