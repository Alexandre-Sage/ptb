import { useUserData } from "../../api/userApi";
import { BoardDashboard } from "./dashboard/BoardDashBoard";
import "../../scss/user/userComponent.scss";
import { StoryDashboard } from "./dashboard/StoryDashBoard";
import { TaskDashboard } from "./dashboard/TaskDashBoard";
export const User = () => {
  const [user, setUser] = useUserData();

  return (
    <div className="user-main-container">
      <header className="user-header">
        <h1>Dashboard</h1>
        <h2>{user.userName}</h2>
      </header>
      <main className="user-dashboards-container">
        <div className="left-dashboards">
          <BoardDashboard />
          <StoryDashboard />
        </div>
        <div className="right-dashboards">
          <TaskDashboard />
        </div>
      </main>
    </div>
  );
};
