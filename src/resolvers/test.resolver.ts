import { Resolver, Query, Arg, Authorized } from "type-graphql";
import { Test } from "../entities";

@Resolver(Test)
export class TestResolver {
  @Query(() => String)
  public publicTest() {
    return "Got public resource!";
  }

  @Query(() => Test)
  @Authorized()
  public test(@Arg("id") id: string) {
    const item = new Test();
    item.id = id;
    item.name = "Test item";

    return item;
  }

  @Query(() => String)
  @Authorized("ADMIN")
  public adminTest() {
    return "You got the admin data!";
  }
}
