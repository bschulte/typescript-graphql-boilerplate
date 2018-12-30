import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities";
import { NewUserInput } from "../inputs";

@Resolver(User)
export class UserResolver {
  private repository: Repository<User> = getRepository(User);

  @Query(() => User)
  public async user() {
    return await this.repository.findOne();
  }

  @Mutation(() => User)
  public async createUser(@Arg("newUserData") newUserData: NewUserInput) {
    const newUser = await this.repository.create(newUserData);

    return await this.repository.save(newUser);
  }
}
