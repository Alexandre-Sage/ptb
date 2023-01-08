import { Story, StoryRow } from "../../types/story/story.type";
import { connection, transaction } from "../database";
import { StoryMapper } from "../mappers/storyMapper";
import { Repository } from "./repository";

export interface StoryCustomMethods {}
export const storyRepository = () => {
  return Repository<Story, StoryRow>({
    transaction: transaction,
    connection,
    mapper: StoryMapper,
    table: "stories",
    //customMethods: (transaction, table) => {
    //  return {  };
    //},
  });
};
