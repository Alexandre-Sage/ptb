import { useEffect, useState } from "react";
import { postNewBoards, updateBoard, useBoard } from "../../api/boardApi";
import { Board, BoardId } from "../../types/board/Board.type";
import { Event } from "../../types/react/event.type";
import { MainButton } from "../shared/buttons/MainButton";
import { TextArea } from "../shared/inputs/TextArea";
import { TextInput } from "../shared/inputs/TextInput";
import "../../scss/form/boardForm.scss";
export const BoardForm = ({ boardId }: { boardId?: BoardId }) => {
  const [board, getBoardFromServer, setBoard] = useBoard(boardId);
  const onInputChange = ({ target: { value, name } }: Event) => {
    setBoard((board) => ({
      ...structuredClone(board),
      [name]: value,
    }));
  };
  return (
    <form className="board-form">
      <TextInput
        label="Board name"
        name="boardName"
        value={board.boardName || ""}
        onChange={onInputChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={board.description || ""}
        onChange={onInputChange}
      />
      <MainButton
        text="Save"
        onClick={async (event) => {
          event.preventDefault();
          if (boardId) await updateBoard(board);
          else await postNewBoards(board);
        }}
      />
    </form>
  );
};
