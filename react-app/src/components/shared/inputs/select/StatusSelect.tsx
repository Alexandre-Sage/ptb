import { SelectInputProps } from "../../../../types/react/ReactHtmlProps.type";
import { STATUS } from "../../../../types/task/task.type";
import { Select } from "./Select";

export const StatusSelect = ({ label, ...props }: SelectInputProps) => {
  const optionsJsx = Object.values(STATUS).map((status) => {
    const label = status.toLowerCase().split("_").join("");
    return <option key={status} label={label} value={status} />;
  });
  return (
    <Select options={optionsJsx} name="status" value={props.value} {...props} />
  );
};
