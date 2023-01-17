import React, { useState } from "react";
import { ReactSetState } from "../../../types/react/ReactState.type";
// import "../../../scss/modal/modal.scss ";
import "../../../scss/modal/modal.scss";
type HtmlElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;
export type ModalProps = HtmlElementProps & {
  toggleModal: boolean;
  setModal: ReactSetState<boolean>;
  onCloseCallback?: <T>(param?: T) => any;
};
export const useModal = () => {
  const [toggleModal, setModal] = useState<boolean>(false);
  return { toggleModal, setModal };
};
export const Modal = ({
  toggleModal,
  onCloseCallback,
  setModal,
  ...props
}: ModalProps) => {
  return (
    <React.Fragment>
      {toggleModal ? (
        <main className="modal-container">
          <section className="modal-section" {...props}>
            <div
              className="close-cross"
              onClick={() => {
                setModal((prev) => !prev);
                if (onCloseCallback) onCloseCallback();
              }}
            >
              X
            </div>
            {props.children}
          </section>
        </main>
      ) : null}
    </React.Fragment>
  );
};
