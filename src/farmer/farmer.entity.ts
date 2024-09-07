import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 14, unique: true })
  document: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  farmName: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number;

  @Column({ type: 'simple-array' })
  crops: string[];
}
