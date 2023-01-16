import React from "react";
import "../../../scss/inputs/textInput.scss";
interface TextInputProps
  extends Partial<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  > {
  label: string;
}

export const TextInput = ({
  name,
  id,
  className,
  //onChange,
  label,
  ...props
}: TextInputProps) => {
  return (
    <div id={id} className="txt-input-container">
      <div className="txt-input-sub-container">
        <label className="txt-input-label" htmlFor={name}>
          {label}
        </label>

        <input
          className="txt-input"
          type={props.type || "text"}
          name={name}
          value={props.value || ""}
          onChange={props.onChange}
          placeholder={props.placeholder || ""}
        />
      </div>
    </div>
  );
};
