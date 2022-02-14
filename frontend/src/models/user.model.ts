export interface User {
  name: string;
  email: string;
  campus: string;
  role: UserRole;
  matricula?: string;
  password: string;
}

export enum UserRole {
  ALUNO = 'ALUNO',
  ORIENTADOR = 'ORIENTADOR',
  INTERFACE = 'INTERFACE',
}
