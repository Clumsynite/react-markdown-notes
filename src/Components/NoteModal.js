import React, { useState } from "react";
import { Modal } from "antd";

export default function NoteModal({ visible, setVisible }) {
  return (
    <Modal
      title="Add New Note"
      centered
      visible={visible}
      onOk={() => console.log("OK Clicked inside Modal")}
      onCancel={() => {
        console.log("Modal Cancelled");
        setVisible(false);
      }}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
