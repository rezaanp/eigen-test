import React from "react";
import { Button, Modal } from "antd";

//TYPES
interface ModalHistoryProps {
  modalIsOpen: boolean;
  handleCancel: () => void;
  children: React.ReactNode;
}

const ModalHistory: React.FC<ModalHistoryProps> = ({
  modalIsOpen,
  handleCancel,
  children,
}) => {
  return (
    <Modal
      open={modalIsOpen}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ModalHistory;
