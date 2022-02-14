import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Solicitation } from '../solicitations/entities/solicitation.entity';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  campus: string;

  @Column()
  role: UserRole;

  @Column({ unique: true, nullable: true })
  matricula?: string;

  @OneToMany((_type) => Solicitation, (solicitation) => solicitation.user, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  solicitations?: Solicitation[];
}
