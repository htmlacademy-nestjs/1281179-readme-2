import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ReadmeUserModule } from './readme-user/readme-user.module';

@Module({
  imports: [AuthenticationModule, ReadmeUserModule],
})
export class AppModule {}
