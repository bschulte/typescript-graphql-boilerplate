import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  public email!: string;

  @Field()
  @Length(8)
  public password!: string;
}
