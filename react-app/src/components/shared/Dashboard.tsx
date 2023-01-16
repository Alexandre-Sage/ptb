import { ReactNode, useRef, useState } from "react";
import Draggable, { DraggableBounds } from "react-draggable";
import { serverDateToLocalString } from "../../modules/date";
import { MainButton } from "./buttons/MainButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
// import { DraggableComponent } from "./DraggableComponent";
import { ResizableComponent } from "./ResizableComponent";
import {
  Navigate,
  useHref,
  Link,
  NavLink,
  RedirectFunction,
  redirect,
} from "react-router-dom";
import "../../scss/dashboard/dashboard.scss";
export interface DashboardProps {
  title: string;
  buttonText: string;
  creationForm: (t: any) => ReactNode;
  data: DashboardData[];
  deleteFunction: (id: string) => void;
  resizableDimension?: {
    width: number;
    height: number;
  };
  itemAreLinks?: boolean;
  urlPrefix?: string;
  urlSufix?: keyof DashboardData;
}

export interface DashboardData {
  name: string;
  creationDate: string | Date;
  editionDate: string | Date;
  id: string;
}

export const Dashboard = ({
  title,
  buttonText,
  creationForm,
  data,
  deleteFunction,
  resizableDimension,
  itemAreLinks,
  urlPrefix,
  urlSufix = "id",
}: DashboardProps) => {
  if (itemAreLinks && !urlPrefix)
    throw new Error("If item are links urlPrefix is required");
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [dataToEditId, setDataToEditId] = useState<string>("");
  const [isDraggable, setDraggable] = useState<boolean>(false);
  const testRef = useRef(null);
  const dataJsx = data.map((data) => (
    <li key={data.id}>
      {itemAreLinks ? (
        <Link
          to={`${urlPrefix}/${data[urlSufix]}`}
          style={{ fontStyle: "normal", fontWeight: "normal" }}
        >
          <h4>{data.name}</h4>
        </Link>
      ) : (
        <h4>{data.name}</h4>
      )}
      <p>Creation: {serverDateToLocalString(data.creationDate)}</p>
      <p>Last Update: {serverDateToLocalString(data.editionDate)}</p>
      <div className="dashboard-action-container">
        {deleteFunction ? (
          <SecondaryButton
            text="Delete"
            onClick={() => deleteFunction(data.id)}
          />
        ) : null}
        <SecondaryButton
          text="Edit"
          onClick={() => {
            setDataToEditId(data.id);
            setDisplayForm((prev) => !prev);
          }}
        />
      </div>
    </li>
  ));
  return (
    // <Draggable nodeRef={testRef} disabled={isDraggable}>
    <ResizableComponent
      onResizeStart={() => setDraggable(true)}
      onResizeStop={() => setDraggable(false)}
      className="dashboard-resizable-container"
      width={resizableDimension?.width ?? 666}
      height={resizableDimension?.height ?? 333}
    >
      <section ref={testRef} className="dashboard-section">
        <div className="title-container">
          <h3>{title}</h3>
        </div>
        <div className="data-container">
          {displayForm ? (
            creationForm(dataToEditId)
          ) : (
            <ul className="data-list">{dataJsx}</ul>
          )}
        </div>
        <div className="dashboard-main-button-container">
          <MainButton
            text={buttonText}
            onClick={() => setDisplayForm((prev) => !prev)}
          />
        </div>
      </section>
    </ResizableComponent>
    // </Draggable>
  );
};
