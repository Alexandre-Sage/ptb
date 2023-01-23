import Draggable from "react-draggable";
import {
  deleteBoard as deleteBoardFetch,
  useBoards,
} from "../../../api/boardApi";
import { serverDateToLocalString } from "../../../modules/date";
import { BoardId } from "../../../types/board/Board.type";
import { BoardForm } from "../../board/BoardForm";
import { SecondaryButton } from "../../shared/buttons/SecondaryButton";
import { Dashboard, DashboardData } from "../../shared/Dashboard";

export const BoardDashboard = () => {
  const [boards, setBoards] = useBoards();
  const deleteBoard = async (boardId: BoardId) => {
    await deleteBoardFetch(boardId);
    setBoards();
  };
  const dashboardData: DashboardData[] = boards.map((board) => ({
    name: board.boardName,
    creationDate: board.creationDate,
    status: board.status,
    id: board.id,
  }));
  return (
    <Dashboard
      itemAreLinks
      urlPrefix="/board"
      title="Boards"
      data={dashboardData}
      buttonText="Create board"
      deleteFunction={deleteBoard}
      creationForm={(id) => <BoardForm boardId={id} />}
      resizableDimension={{ height: 325, width: 900 }}
    />
  );
};
