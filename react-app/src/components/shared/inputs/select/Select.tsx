import React, { ReactNode } from "react";
import { SelectInputProps } from "../../../../types/react/ReactHtmlProps.type";
import "../../../../scss/inputs/select.scss";
export const Select = ({
  options,
  ...props
}: Partial<SelectInputProps> & { options: ReactNode }) => {
  return (
    <div className="select-container">
      {/* <label htmlFor={props.name}>{props.label}</label> */}
      <select {...props} className={"select-input"}>
        {props.value ? null : <option label={props.label} />}
        {options}
      </select>
    </div>
  );
};
