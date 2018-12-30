import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "users" })
@ObjectType({ description: "User model" })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public readonly id!: string;

  @Field(() => String)
  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Field(() => Date)
  @CreateDateColumn()
  public created!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updated!: Date;
}
