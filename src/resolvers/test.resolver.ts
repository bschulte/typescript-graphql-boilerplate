import { Resolver, Query, Arg } from "type-graphql";
import { Test } from "../models/test.model";

@Resolver(Test)
export class TestResolver {
  @Query(() => Test)
  public test(@Arg("id") id: string) {
    const item = new Test();
    item.id = id;
    item.name = "Test item";

    return item;
  }
}
