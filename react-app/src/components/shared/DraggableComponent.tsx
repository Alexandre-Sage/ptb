/* import { useState } from "react";
import Draggable, { DraggableProps } from "react-draggable";

export const DraggableComponent = (
  props: Partial<DraggableProps> & { enabled: boolean }
) => {
  console.log(props.enabled);
  const [isEnabled, setEnabled] = useState<boolean>(props.enabled);
  return (
    <Draggable {...props} disabled={!isEnabled}>
      {props.children}
    </Draggable>
  );
}; */ export {};
