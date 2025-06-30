import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Click } from '../../analytics/entities/click.entity';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 20 })
  shortUrl: string;

  @Column()
  originalUrl: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  clickCount: number;

  @OneToMany(() => Click, (click) => click.url)
  clickEvents: Click[];
}
