import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserDtoSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(12),
  fullName: z.string().min(3).max(50),
  avatarId: z.string().optional(),
});

export class UserDto extends createZodDto(UserDtoSchema) {}
