import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  age?: number;
}
