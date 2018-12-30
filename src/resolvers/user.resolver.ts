import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities";
import { UserInput } from "../inputs";
import { randomStr } from "../helpers/util";
import { hashPassword, comparePasswords } from "../helpers/authentication";

@Resolver(User)
export class UserResolver {
  private repository: Repository<User> = getRepository(User);

  @Query(() => User)
  public async user() {
    return await this.repository.findOne();
  }

  @Mutation(() => User)
  public async createUser(@Arg("newUserData") newUserData: UserInput) {
    const newUser = await this.repository.create(newUserData);
    newUser.apiKey = randomStr(36);
    newUser.password = hashPassword(newUserData.password);

    return await this.repository.save(newUser);
  }

  @Mutation(() => User)
  public async login(@Arg("userData") { email, password }: UserInput) {
    const user = await this.repository.findOne({ email });
    // Check if the user exists
    if (!user) {
      console.log("Could not find user for email:", email);
      throw new Error("Could not find user");
    }

    // Check if the password is correct
    if (!comparePasswords(password, user.password)) {
      console.log("Invalid password entered for user:", email);
      throw new Error("Invalid password");
    }

    return user;
  }
}
