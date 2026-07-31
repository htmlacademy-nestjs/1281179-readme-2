export interface User {
  id?: string; // Опционален потому что интерфейс может быть использован на момент создания пользователя.
  fullName: string;
  email: string;
  registeredAt: Date;
  avatarId?: string;
}
