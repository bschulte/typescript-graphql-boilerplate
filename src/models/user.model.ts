import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({ description: "User model" })
export class User {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;
}
