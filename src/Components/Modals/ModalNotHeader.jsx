
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export function ModalNotHeader({ size, component, openModal, setOpenModal }) {

  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Modal
        show={openModal}
        size={size}
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          {component}
        </ModalBody>
      </Modal>
    </>
  );
}