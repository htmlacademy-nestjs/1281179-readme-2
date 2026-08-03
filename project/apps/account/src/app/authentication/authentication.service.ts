import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReadmeUserRepository } from '../readme-user/readme-user.repository';
import { UserDto } from './dto/user.dto';
import { ReadmeUserEntity } from '../readme-user/readme-user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly readmeUserRepository: ReadmeUserRepository) {}

  public async register(userDto: UserDto): Promise<ReadmeUserEntity> {
    const existingUser = await this.readmeUserRepository.findByEmail(
      userDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await new ReadmeUserEntity({
      ...userDto,
      passwordHash: '',
      registeredAt: new Date(),
    }).setPassword(userDto.password);

    return await this.readmeUserRepository.save(user);
  }

  public async authenticate(userDto: LoginUserDto): Promise<ReadmeUserEntity> {
    const existingUser = await this.readmeUserRepository.findByEmail(
      userDto.email,
    );

    if (!existingUser) {
      throw new UnauthorizedException('Wrong email or password');
    }

    if (!(await existingUser.comparePassword(userDto.password))) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return existingUser;
  }

  public async getUserById(id: string): Promise<ReadmeUserEntity> {
    const existingUser = await this.readmeUserRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    return existingUser;
  }
}
