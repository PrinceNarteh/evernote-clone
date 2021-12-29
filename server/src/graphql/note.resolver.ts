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
        created_by: user,
      });
      await note.save();
      return note;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async updateNote(
    @Arg("noteId") noteId: string,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() ctx: MyContext
  ): Promise<Note> {
    try {
      const note = await Note.findOne(noteId, { relations: ["created_by"] });
      if (!note) throw new Error("Note not found.");

      if (note.created_by.id !== ctx.tokenPayload?.userId) {
        throw new Error("You're not authorized update this note.");
      }

      note.title = title;
      note.content = content;
      await note.save();
      return note;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNote(
    @Arg("noteId") noteId: string,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    try {
      const note = await Note.findOne(noteId, { relations: ["created_by"] });
      if (!note) throw new Error("Note not found.");

      if (note.created_by.id !== ctx.tokenPayload?.userId) {
        throw new Error("You're not authorized update this note.");
      }

      await note.remove();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
