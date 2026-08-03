import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ZodResponse } from 'nestjs-zod';
import { LoginUserRdo } from './dto/login-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRdo } from './dto/user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  @ZodResponse({ type: LoginUserRdo })
  public async login(@Body() userDto: LoginUserDto) {
    const { id, ...rest } = (
      await this.authService.authenticate(userDto)
    ).toPlainObject();

    if (!id) {
      throw new Error('Authenticated user has no id');
    }

    return { id, ...rest };
  }

  @Post('signup')
  @HttpCode(201)
  @ZodResponse({ type: UserRdo })
  public async signup(@Body() createUserDto: UserDto) {
    const { id, ...rest } = (
      await this.authService.register(createUserDto)
    ).toPlainObject();

    if (!id) {
      throw new Error('Signup user has no id');
    }

    return { id, ...rest };
  }

  @Get(':id')
  @HttpCode(200)
  @ZodResponse({ type: UserRdo })
  public async getUser(@Param('id') id: string) {
    const existUser = await this.authService.getUserById(id);
    return { ...existUser, id };
  }
}
