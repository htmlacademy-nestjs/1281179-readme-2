import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ReadmeUserModule } from './readme-user/readme-user.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [AuthenticationModule, ReadmeUserModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ]
})
export class AppModule {}
