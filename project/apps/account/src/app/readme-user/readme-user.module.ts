import { Module } from '@nestjs/common';
import { ReadmeUserRepository } from './readme-user.repository';

@Module({
  providers: [ReadmeUserRepository],
  exports: [ReadmeUserRepository],
})
export class ReadmeUserModule {}
