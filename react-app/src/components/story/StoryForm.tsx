import { postStory, updateStory, useStory } from "../../api/storyApi";
import { Event } from "../../types/react/event.type";
import { StoryId } from "../../types/story/story.type";
import { MainButton } from "../shared/buttons/MainButton";
import { BoardSelect } from "../shared/inputs/select/BoardsSelect";
import { TextArea } from "../shared/inputs/TextArea";
import { TextInput } from "../shared/inputs/TextInput";

export const StoryForm = ({ storyId }: { storyId?: StoryId }) => {
  const [story, updateStoryData, setStory] = useStory(storyId);
  const onInputChange = ({
    /* currentTarget: { value, name }, */ target: { value, name },
  }: Event) =>
    setStory((story) => ({
      ...structuredClone(story),
      [name]: value,
    }));
  return (
    <form>
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
        }}
      />
    </form>
  );
};
