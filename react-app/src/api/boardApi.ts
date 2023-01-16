import { useEffect, useState } from "react";
import { finished } from "stream";
import { Board, BoardId } from "../types/board/Board.type";
import { NewBoardData } from "../types/board/NewBoard.type";
import { ReactSetState } from "../types/react/ReactState.type";
import { Story } from "../types/story/story.type";
import { Task } from "../types/task/task.type";
import { CrudAPI } from "./fetch/CrudApi";
import { functionalFetch } from "./fetch/fetch";
import { StoryApi } from "./storyApi";
import { TaskApi } from "./taskApi";

interface FullBoard {
  board: Board;
  stories: Story[];
}

class BoardApi extends CrudAPI<Board, BoardId> {
  constructor(private readonly storyApi: StoryApi, readonly prefix: string) {
    super(prefix);
  }
  useBoards = (): [Board[], () => void] => {
    const [boards, setBoards] = useState<Board[]>([]);
    const updateBoardsData = async () => {
      const response = await this.getAllData();
      setBoards(structuredClone(response.boards));
    };
    useEffect(() => {
      updateBoardsData();
    }, []);
    return [boards, updateBoardsData];
  };
  useBoard = (
    boardId?: BoardId
  ): [Board, (boardId: BoardId) => void, ReactSetState<Board>] => {
    const [board, setBoard] = useState<Board>({} as Board);
    const updateBoard = async (boardId: BoardId) => {
      const response = await this.getDataById(boardId);
      setBoard({
        ...response.board,
        finished: response.board.finished === 0 ? false : true,
      });
    };
    if (boardId) {
      useEffect(() => {
        updateBoard(boardId);
      }, []);
    }
    return [board, updateBoard, setBoard];
  };
  getFullBoard = async (boardId: BoardId): Promise<FullBoard> => {
    const { board } = await this.getDataById(boardId);
    const { stories } = await this.storyApi.getStoriesByBoardId(boardId);

    return {
      board: structuredClone(board),
      stories: structuredClone(stories),
    };
  };
  useFullBoard = (boardId: BoardId) => {
    const [fullBoard, setFullBoard] = useState<FullBoard>({} as FullBoard);
    const updateBoard = async () => {
      const board = await this.getFullBoard(boardId);
      setFullBoard(board);
    };
    useEffect(() => {
      updateBoard();
    }, []);
    return {
      ...fullBoard,
      updateBoard,
      setFullBoard,
    };
  };
}
export const {
  delete: deleteBoard,
  post: postNewBoards,
  useBoards,
  useBoard,
  update: updateBoard,
  useFullBoard,
} = new BoardApi(new StoryApi(new TaskApi("/tasks"), "/stories"), "/boards");
