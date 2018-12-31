import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import jwt from "jsonwebtoken";

import { User } from "../entities";
import { UserInput } from "../inputs";
import { comparePasswords } from "../helpers/authentication";

@Resolver(User)
export class UserResolver {
  private repository: Repository<User> = getRepository(User);

  @Query(() => User)
  @Authorized(["ADMIN"])
  public async user(
    @Arg("email", { nullable: true }) email: string,
    @Arg("userId", { nullable: true }) userId: number
  ) {
    if (!email && !userId) {
      return null;
    }
    if (email) {
      return await this.repository.findOne({ email });
    } else {
      return await this.repository.findOne({ id: userId });
    }
  }

  @Mutation(() => User)
  @Authorized(["ADMIN"])
  public async createUser(@Arg("newUserData") newUserData: UserInput) {
    // Check if user with the given email exists already
    const user = await this.repository.findOne({ email: newUserData.email });
    if (user) {
      console.log("User already exists with email:", newUserData.email);
      throw new Error("User exists already");
    }

    const newUser = await this.repository.create(newUserData);

    return await this.repository.save(newUser);
  }

  @Mutation(() => String)
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

    return jwt.sign({ email }, process.env.APP_KEY || "super secret", {
      expiresIn: "2d"
    });
  }
}
