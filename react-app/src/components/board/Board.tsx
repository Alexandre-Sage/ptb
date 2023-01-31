import { useParams } from "react-router-dom";
import { updateBoard, useFullBoard } from "../../api/boardApi";
import { Story } from "../story/Story";
import "../../scss/board/board.scss";
import { SecondaryButton } from "../shared/buttons/SecondaryButton";
import { Modal, useModal } from "../shared/modal/Modal";
import React, { useState } from "react";
import { BoardForm } from "./BoardForm";
import { StoryForm } from "../story/StoryForm";
import { StatusSelect } from "../shared/inputs/select/StatusSelect";
import { Event } from "../../types/react/event.type";
import { Status } from "../../types/task/task.type";
export const Board = () => {
  const { boardId } = useParams();
  const {
    board,
    stories,
    setFullBoard,
    updateBoard: refreshBoard,
  } = useFullBoard(boardId ?? "");
  const { setModal, toggleModal } = useModal();
  const [story, setStory] = useState<boolean>(false);
  const onStatusChange = ({ currentTarget: { value, name } }: Event) => {
    setFullBoard(({ board, stories }) => ({
      stories,
      board: { ...board, status: value as Status },
    }));
    updateBoard({
      ...board,
      status: value as Status,
    });
  };
  if (!stories || !stories.length) return <div>Loading...</div>;
  const storyJsx = stories.map((story) => <Story storyId={story.id} />);
  return (
    <React.Fragment>
      <section className="board-section">
        <header className="board-header">
          <h1>Board: {board.boardName}</h1>
          <StatusSelect
            label=""
            value={board.status}
            onChange={onStatusChange}
          />
          <div>
            <SecondaryButton
              onClick={() => setModal((prev) => !prev)}
              text="Edit"
            />
            <SecondaryButton
              onClick={() => setStory((prev) => !prev)}
              text="Add story"
            />
          </div>
        </header>
        <main className="board-main">{storyJsx}</main>
      </section>
      <Modal setModal={setModal} toggleModal={toggleModal}>
        <BoardForm boardId={boardId} />
      </Modal>
      <Modal setModal={setStory} toggleModal={story}>
        <StoryForm boardId={boardId} update={refreshBoard} />
      </Modal>
    </React.Fragment>
  );
};
