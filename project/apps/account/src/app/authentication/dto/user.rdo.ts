import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const stringToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
const UserRdoScheme = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  avatarId: z.string().optional(),
  registeredAt: stringToDate,
});

export class UserRdo extends createZodDto(UserRdoScheme, {
  codec: true,
}) {}
