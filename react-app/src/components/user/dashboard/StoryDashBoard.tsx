import { deleteStory, useStories } from "../../../api/storyApi";
import { StoryId } from "../../../types/story/story.type";
import { Dashboard, DashboardData } from "../../shared/Dashboard";
import { StoryForm } from "../../story/StoryForm";
import { StoryFormModal } from "../../story/StoryFormModal";
export const StoryDashboard = () => {
  const [stories, setStories] = useStories();
  const onDeleteStory = async (storyId: StoryId) => {
    await deleteStory(storyId);
    setStories();
  };
  const dashboardData: DashboardData[] = stories.map((story) => ({
    name: story.storyName,
    creationDate: story.creationDate,
    status: story.status,
    id: story.id,
  }));
  return (
    <Dashboard
      title="Stories"
      data={dashboardData}
      buttonText="Create story"
      deleteFunction={onDeleteStory}
      creationForm={(id) => <StoryForm storyId={id} />}
      resizableDimension={{ height: 300, width: 900 }}
    />
  );
};
