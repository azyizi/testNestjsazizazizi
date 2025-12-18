import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class VehiculeAziz {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  pricePerDay: number;

  @Column()
  available: boolean;
}
