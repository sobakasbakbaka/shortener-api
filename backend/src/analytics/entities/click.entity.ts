import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from '../../url/entities/url.entity';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Url, (url) => url.clickEvents, { onDelete: 'CASCADE' })
  url: Url;
}
