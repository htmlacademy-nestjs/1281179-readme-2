import { BaseMemoryRepository } from "@readme/shared-data-access";
import { ReadmeUserEntity } from "./readme-user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReadmeUserRepository extends BaseMemoryRepository<ReadmeUserEntity> {
  public async findByEmail(email: string): Promise<ReadmeUserEntity | null> {
    const values = this.entities.values();

    for (const user of values) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }
}
