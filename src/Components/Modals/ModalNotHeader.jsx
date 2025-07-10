import { Modal, ModalBody, ModalHeader } from "flowbite-react";

export function ModalNotHeader({ size, component, openModal, setOpenModal }) {
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