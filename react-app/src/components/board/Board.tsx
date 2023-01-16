import { useParams } from "react-router-dom";
import { useFullBoard } from "../../api/boardApi";
import { Story } from "../story/Story";

export const Board = () => {
  const { boardId } = useParams();
  const { board, stories, setFullBoard, updateBoard } = useFullBoard(
    boardId ?? ""
  );

  if (!stories || !stories.length) return <div>Loading...</div>;
  const storyJsx = stories.map((story) => <Story storyId={story.id} />);
  return (
    <div>
      <header>
        <h1>Board</h1>
      </header>
      <main>{storyJsx}</main>
    </div>
  );
};
