import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Note } from "../entity/Note";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../helpers/myContext";
import { User } from "../entity/User";

@Resolver()
export class NoteResolver {
  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async listNotes(@Ctx() ctx: MyContext) {
    return Note.find({ relations: ["created_by"] });
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async addNote(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() ctx: MyContext
  ): Promise<Note> {
    console.log(title, content);
    try {
      const user = await User.findOne(ctx.tokenPayload?.userId);
      const note = Note.create({
        title,
        content,
        created_by: user?.id,
      });
      await note.save();
      return note;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
