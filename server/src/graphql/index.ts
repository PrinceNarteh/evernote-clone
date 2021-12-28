import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./user.resolver";
import { NoteResolver } from "./note.resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  NoteResolver,
];
