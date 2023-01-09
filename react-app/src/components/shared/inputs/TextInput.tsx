import React from "react";
import "./textInput.scss";
interface TextInputProps extends HTMLInputElement {
  onChange: <T>(p: T) => void;
  label: string;
}

export const TextInput = ({
  name,
  id,
  className,
  onChange,
  label,
  ...props
}: TextInputProps) => {
  return (
    <div id={id} className="txt-input-container">
      <label className="txt-input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="txt-input"
        type="text"
        name={name}
        value={props.value || ""}
        onChange={onChange}
        placeholder={props.placeholder || ""}
      />
    </div>
  );
};
