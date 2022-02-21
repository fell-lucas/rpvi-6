import { UserRole } from '../../auth/user-role.enum';
import { User } from '../../auth/user.entity';

export function MockUser(_req): User {
  return {
    id: 'MockId',
    name: 'User',
    email: 'user@user.com',
    campus: { cidade: 'Alegrete' },
    role: UserRole.ALUNO,
    matricula: '1824568422',
  } as User;
}
