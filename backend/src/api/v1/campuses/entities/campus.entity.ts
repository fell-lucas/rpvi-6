/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Institution } from '../../solicitations/entities/institution.entity';
import { Intern } from '../../solicitations/entities/intern.entity';

@Entity()
export class Campus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((_type) => Intern, (intern) => intern.campus, {
    eager: false,
  })
  estagiarios!: Intern[];

  @OneToMany((_type) => Institution, (institution) => institution.campus, {
    eager: false,
  })
  instituicoes!: Institution[];

  @OneToMany((_type) => User, (usuario) => usuario.campus, {
    eager: false,
  })
  usuarios!: User[];

  @Column({ unique: true })
  cidade: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
