import React from "react";
import { ReactHtmlProps } from "../../../types/react/ReactHtmlProps.type";
import "../../../scss/buttons/secondaryButton.scss";

interface MainButtonProps extends ReactHtmlProps<HTMLButtonElement> {
  text: string;
}

export const SecondaryButton = ({ text, ...props }: MainButtonProps) => {
  return (
    <div className="secondary-btn-container">
      <button
        className="secondary-btn"
        onClick={props.onClick}
        name={props.name}
        {...props}
      >
        {text}
      </button>
    </div>
  );
};
