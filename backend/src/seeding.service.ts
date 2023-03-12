import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './api/v1/auth/user.entity';
import { Campus } from './api/v1/campuses/entities/campus.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './api/v1/auth/user-role.enum';
import { Unit } from './api/v1/solicitations/entities/unit.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async clearAndSeed(): Promise<void> {
    const entities = this.entityManager.connection.entityMetadatas;
    for (const entity of entities) {
      const repository = await this.entityManager.getRepository(entity.name);
      await repository.clear();
    }

    await this.entityManager.save(Campus, [
      {
        cidade: 'São Paulo',
        id: 'campus-sp',
      },
    ]);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('orientador', salt);
    await this.entityManager.save(User, [
      {
        name: 'Orientador',
        email: 'ori@rpvi.com',
        password: hashedPassword,
        role: UserRole.ORIENTADOR,
        campus: {
          id: 'campus-sp',
        },
      },
    ]);

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
