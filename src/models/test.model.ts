import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Test {
  @Field(type => ID)
  id!: string;

  @Field(type => String)
  name!: string;
}
