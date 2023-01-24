import { useDroppable } from "@dnd-kit/core";
import { getStatus } from "../../modules/getStatus";
import { Task } from "../../types/task/task.type";
import { TaskCard } from "../task/Task";
import "../../scss/story/storySection.scss";

export const StorySection = ({ tasks, id }: { tasks: Task[]; id: string }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <section ref={setNodeRef} id={id} className="story-section-container">
      <header>
        <h3>{getStatus(id.split("-")[0])}</h3>
      </header>
      <main className="story-section-main" ref={setNodeRef}>
        {tasks
          .filter((task) => task.status === id.split("-")[0])
          .map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
      </main>
    </section>
  );
};
