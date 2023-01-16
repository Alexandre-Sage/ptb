import React from "react";
import "../../../scss/buttons/mainButton.scss";
import { ReactHtmlProps } from "../../../types/react/ReactHtmlProps.type";
interface MainButtonProps extends ReactHtmlProps<HTMLButtonElement> {
  text: string;
}

export const MainButton = ({ text, ...props }: MainButtonProps) => {
  return (
    <div className="btn-container">
      <button
        className="main-btn"
        onClick={props.onClick}
        name={props.name}
        {...props}
      >
        {text}
      </button>
    </div>
  );
};
