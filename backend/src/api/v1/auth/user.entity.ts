/* istanbul ignore file */
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campus } from '../campuses/entities/campus.entity';
import { Institution } from '../solicitations/entities/institution.entity';
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
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne((type) => Campus, (campus) => campus.usuarios, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  campus: Campus;

  @Column()
  role: UserRole;

  @Column({ unique: true, nullable: true })
  matricula?: string;

  @OneToMany((_type) => Solicitation, (solicitation) => solicitation.user, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  solicitations?: Solicitation[];

  @OneToMany(
    (_type) => Institution,
    (institution) => institution.orientadorEstagio,
    {
      eager: false,
    },
  )
  @Exclude({ toPlainOnly: true })
  orientedSolicitations?: Institution[];
}
