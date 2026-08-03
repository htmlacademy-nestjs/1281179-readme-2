import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const LoginUserRdoSchema = z.object({
  id: z.string(),
  email: z.email(),
});

export class LoginUserRdo extends createZodDto(LoginUserRdoSchema) {};
