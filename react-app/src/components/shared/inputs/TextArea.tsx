import React from "react";
// import "../../../scss/areas/textInput.scss";
interface TextAreaProps
  extends Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  > {
  label: string;
}

export const TextArea = ({
  name,
  id,
  className,
  //onChange,
  label,
  ...props
}: TextAreaProps) => {
  return (
    <div id={id} className="txt-area-container">
      <div className="txt-area-sub-container">
        <label className="txt-area-label" htmlFor={name}>
          {label}
        </label>

        <textarea
          className="txt-area"
          name={name}
          value={props.value || ""}
          onChange={props.onChange}
          placeholder={props.placeholder || ""}
        />
      </div>
    </div>
  );
};
