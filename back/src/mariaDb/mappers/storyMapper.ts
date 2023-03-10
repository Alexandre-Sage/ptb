import { Board, BoardId, BoardRow } from "../../types/board/board.type";
import { Mapper } from "../../types/globals/mapper.type";
import { StoryRow, Story } from "../../types/story/story.type";

const dbRowToObject = (dbRow: StoryRow): Story => {
  return {
    id: dbRow.id,
    storyName: dbRow.story_name,
    boardId: dbRow.board_id,
    creationDate: dbRow.creation_date,
    lastUpdate: dbRow.last_update,
    status: dbRow.status,
    editionDate: dbRow.edition_date,
    description: dbRow.description,
    userId: dbRow.user_id,
  };
};
const objectToDbRow = (story: Story): StoryRow => {
  return {
    id: story.id,
    story_name: story.storyName,
    board_id: story.boardId,
    creation_date: story.creationDate,
    last_update: story.lastUpdate,
    status: story.status,
    edition_date: story.editionDate,
    description: story.description,
    user_id: story.userId,
  };
};

function Mapper({
  dbRowToObject,
  objectToDbRow,
}: Mapper<Story, StoryRow>): Mapper<Story, StoryRow> {
  return {
    objectToDbRow,
    dbRowToObject,
  };
}

export const StoryMapper = () => Mapper({ objectToDbRow, dbRowToObject });
