import { postStory, updateStory, useStory } from "../../api/storyApi";
import { Event } from "../../types/react/event.type";
import { StoryId } from "../../types/story/story.type";
import { MainButton } from "../shared/buttons/MainButton";
import { BoardSelect } from "../shared/inputs/select/BoardsSelect";
import { TextArea } from "../shared/inputs/TextArea";
import { TextInput } from "../shared/inputs/TextInput";
import "../../scss/form/storyForm.scss";
import { BoardId } from "../../types/board/Board.type";
import { useEffect } from "react";
export interface StoryFormProps {
  storyId?: StoryId;
  boardId?: BoardId;
  update?: () => any;
}

export const StoryForm = ({ storyId, boardId, update }: StoryFormProps) => {
  const [story, updateStoryData, setStory] = useStory(storyId);
  const onInputChange = ({
    /* currentTarget: { value, name }, */ target: { value, name },
  }: Event) => {
    setStory((story) => ({
      ...structuredClone(story),
      [name]: value,
    }));
  };
  useEffect(() => {
    if (boardId)
      setStory((story) => ({
        ...story,
        boardId,
      }));
  }, []);
  return (
    <form className="story-form">
      <BoardSelect
        onChange={(e) => {
          onInputChange(e);
        }}
        value={story.boardId ?? ""}
        label="Board"
      />
      <TextInput
        name="storyName"
        label="Story name"
        onChange={onInputChange}
        value={story.storyName ?? ""}
      />
      <TextArea
        name="description"
        label="Description"
        onChange={onInputChange}
        value={story.description ?? ""}
      />
      <MainButton
        text="Save"
        onClick={async (event) => {
          event.preventDefault();
          if (storyId) await updateStory(story);
          else await postStory(story);
          if (update) update();
        }}
      />
    </form>
  );
};
