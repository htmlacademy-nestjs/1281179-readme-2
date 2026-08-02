import { Module } from "@nestjs/common";
import { ReadmeUserModule } from '../readme-user/readme-user.module';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [ReadmeUserModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
