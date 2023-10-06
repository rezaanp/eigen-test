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
      width={800}
      open={modalIsOpen}
      onCancel={handleCancel}
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
