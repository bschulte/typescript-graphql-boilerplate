import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Test {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;
}
