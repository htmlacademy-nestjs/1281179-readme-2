import {hash, compare} from 'bcrypt';
import { AuthUser } from '@readme/shared-types';
import { Entity } from '@readme/shared-data-access';
import { SALT_ROUNDS } from './readme-user.constants';

export class ReadmeUserEntity implements AuthUser, Entity<string> {
  public passwordHash: string;
  public id?: string;
  public fullName: string;
  public email: string;
  public registeredAt: Date;
  public avatarId?: string;

  constructor(authUser: AuthUser) {
    this.id = authUser.id;
    this.email = authUser.email;
    this.passwordHash = authUser.passwordHash;
    this.fullName = authUser.fullName;
    this.registeredAt = authUser.registeredAt;
    this.avatarId = authUser.avatarId;
  }

  public toPlainObject(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      fullName: this.fullName,
      registeredAt: this.registeredAt,
      avatarId: this.avatarId,
    };
  }

  public async setPassword(password: string): Promise<ReadmeUserEntity> {
    this.passwordHash = await hash(password, SALT_ROUNDS);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }
}
