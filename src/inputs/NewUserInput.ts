import { InputType, Field } from "type-graphql";

@InputType()
export class NewUserInput {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
