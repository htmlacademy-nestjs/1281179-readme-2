import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ZodResponse } from 'nestjs-zod';
import { LoginUserRdo } from './dto/login-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './dto/user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Wrong email or password',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Authenticated user has no id',
  })
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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Authenticated user has no id',
  })
  @ZodResponse({ type: UserRdo })
  public async signup(@Body() createUserDto: CreateUserDto) {
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id not found',
  })
  @ZodResponse({ type: UserRdo })
  public async getUser(@Param('id') id: string) {
    const existUser = await this.authService.getUserById(id);
    return { ...existUser, id };
  }
}
