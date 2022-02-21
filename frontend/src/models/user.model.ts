import { Campus } from ".";

export interface User {
  [x: string]: string | undefined | Campus | UserRole; 
  name: string;
  email: string;
  campus: Campus;
  role: UserRole;
  matricula?: string;
  password: string;
}

export enum UserRole {
  ALUNO = 'ALUNO',
  ORIENTADOR = 'ORIENTADOR',
  INTERFACE = 'INTERFACE',
}
