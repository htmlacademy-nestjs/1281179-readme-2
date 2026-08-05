export class EntityNoIdError extends Error {
  constructor() {
    super('Entity has no id');
    this.name = 'EntityNoIdError';
  }
}
