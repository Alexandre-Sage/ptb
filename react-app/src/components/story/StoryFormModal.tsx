import React from "react";
import { Modal, ModalProps } from "../shared/modal/Modal";
import { StoryForm, StoryFormProps } from "./StoryForm";

export const StoryFormModal = ({
  setModal,
  toggleModal,
  storyId,
}: StoryFormProps & ModalProps) => {
  return (
    <Modal setModal={setModal} toggleModal={toggleModal}>
      <StoryForm storyId={storyId} />
    </Modal>
  );
};
