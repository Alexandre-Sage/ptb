import { ResizableBoxProps, ResizableBox } from "react-resizable";

export const ResizableComponent = ({
  ...props
}: Partial<ResizableBoxProps>) => {
  return (
    <ResizableBox
      width={props.width || 200}
      height={props.height || 200}
      {...props}
      handle={
        <div
          style={{
            //marginLeft: "92%",
            width: "2rem",
            height: "2rem",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            bottom: "99%",
            left: "95%",
            marginRight: 5,
          }}
        >
          +
        </div>
      }
      {...props}
      className={props.className}
    >
      {props.children}
    </ResizableBox>
  );
};
