import { ReactNode } from "react";
import { useBoards } from "../../../../api/boardApi";
import { BoardId } from "../../../../types/board/Board.type";
import { SelectInputProps } from "../../../../types/react/ReactHtmlProps.type";
import { Select } from "./Select";

type OptionProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

export const BoardSelect = (
  props: Partial<SelectInputProps> & { boardId?: BoardId }
) => {
  const [boards, updateBoards] = useBoards();
  const selectOptionsJsx = boards.map((board) => {
    return <option key={board.id} value={board.id} label={board.boardName} />;
  });
  return <Select name="boardId" options={selectOptionsJsx} {...props} />;
};
