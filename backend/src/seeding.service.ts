import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './api/v1/auth/user.entity';
import { Campus } from './api/v1/campuses/entities/campus.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './api/v1/auth/user-role.enum';
import { Unit } from './api/v1/solicitations/entities/unit.entity';
import { Institution } from './api/v1/solicitations/entities/institution.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async clearAndSeed(): Promise<void> {
    const entities = this.entityManager.connection.entityMetadatas;
    for (const entity of entities) {
      const repository = await this.entityManager.getRepository(entity.name);
      await repository.clear();
    }

    const institution = await this.entityManager.save(Institution, [
      {
        id: 'instituicao-unipampa',
        bairro: 'Caixa Postal 118',
        cep: '97501970',
        cidade: 'Uruguaiana',
        uf: 'RS',
        endereco: 'BR 472 - Km 585',
        razaoSocial: 'Fundação Universidade Federal do Pampa',
        telefone: '5539110200',
        cnpj: '09341233000122',
        supervisorEstagio: 'Supervisor 1',
        cargoSupervisor: 'Diretor do Campus',
        representanteLegal: 'Representante 1',
        cargoRepresentante: 'Cargo 2',
      },
    ]);

    await this.entityManager.save(Campus, [
      {
        cidade: 'Alegrete',
        id: 'campus-alegrete',
        instituicoes: [
          {
            id: 'instituicao-unipampa',
          },
        ],
      },
    ]);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password', salt);

    const users = await this.entityManager.save(User, [
      {
        name: 'Orientador',
        email: 'ori@rpvi.com',
        password: hashedPassword,
        role: UserRole.ORIENTADOR,
        campus: {
          id: 'campus-alegrete',
        },
      },
      {
        name: 'Aluno',
        email: 'aluno@rpvi.com',
        password: hashedPassword,
        role: UserRole.ALUNO,
        matricula: '123456',
        campus: {
          id: 'campus-alegrete',
        },
      },
    ]);

    institution[0].orientadorEstagio = users[0];
    await this.entityManager.save(Institution, institution[0]);

    await this.entityManager.save(Unit, [
      {
        bairro: 'Vila Mariana',
        cep: '04101000',
        cidade: 'São Paulo',
        uf: 'SP',
        endereco: 'Rua Vergueiro, 3185',
        razaoSocial: 'Empresa 1',
        telefone: '11999999999',
        cnpj: '12345678901234',
        supervisorEstagio: 'Supervisor 1',
        cargoSupervisor: 'Cargo 1',
        representanteLegal: 'Representante 1',
        cargoRepresentante: 'Cargo 2',
      },
    ]);
  }
}
