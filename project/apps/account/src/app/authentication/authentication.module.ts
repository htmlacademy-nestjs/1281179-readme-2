import { Module } from "@nestjs/common";
import { ReadmeUserModule } from '../readme-user/readme-user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [ReadmeUserModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
