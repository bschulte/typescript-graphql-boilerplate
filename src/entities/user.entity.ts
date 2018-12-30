import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
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
}
