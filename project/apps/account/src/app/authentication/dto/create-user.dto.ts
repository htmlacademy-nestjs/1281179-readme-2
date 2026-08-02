import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateUserDtoSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(12),
  fullName: z.string().min(3).max(50),
  avatarId: z.string().optional(),
});

export class CreateUserDto extends createZodDto(CreateUserDtoSchema) {}
export type CreateUser = z.infer<typeof CreateUserDtoSchema>;
