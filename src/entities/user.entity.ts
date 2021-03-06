import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { hashString } from "../helpers/authentication";

@Entity({ name: "users" })
@ObjectType({ description: "User model" })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field(() => String)
  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column({ default: false })
  public isAdmin!: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  public created!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updated!: Date;

  @BeforeInsert()
  public beforeInsert() {
    this.password = hashString(this.password);
  }
}
