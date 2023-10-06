import React from "react";
import { Modal } from "antd";

//TYPES
interface ModalHistoryProps {
  errorMessage: string;
  modalIsOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  children: React.ReactNode;
}

const ModalConfirm: React.FC<ModalHistoryProps> = ({
  errorMessage,
  modalIsOpen,
  handleCancel,
  handleConfirm,
  children,
}) => {
  return (
    <>
      <Modal open={modalIsOpen} onOk={handleConfirm} onCancel={handleCancel}>
        {children}
        <p style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</p>
      </Modal>
    </>
  );
};

export default ModalConfirm;
