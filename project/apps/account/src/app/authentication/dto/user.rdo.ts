import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserRdoScheme = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  avatarId: z.string().optional(),
  registeredAt: z.date(),
});

export class UserRdo extends createZodDto(UserRdoScheme) {}
