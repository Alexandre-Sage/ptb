import { useStories } from "../../../../api/storyApi";
import { SelectInputProps } from "../../../../types/react/ReactHtmlProps.type";
import { StoryId } from "../../../../types/story/story.type";
import { Select } from "./Select";

export const StoriesSelect = (
  props: Partial<SelectInputProps> & { storyId?: StoryId }
) => {
  const [stories, updateStories] = useStories();
  const selectOptionsJsx = stories.map((story) => {
    return <option key={story.id} value={story.id} label={story.storyName} />;
  });
  return (
    <Select
      options={selectOptionsJsx}
      name="storyId"
      label="Story"
      {...props}
    />
  );
};
