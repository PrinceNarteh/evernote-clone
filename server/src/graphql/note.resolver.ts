import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Note } from "../entity/Note";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "./../helpers/myContext";

@Resolver()
export class NoteResolver {
  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async listNotes(@Ctx() ctx: MyContext) {
    return Note.find({});
  }
}
