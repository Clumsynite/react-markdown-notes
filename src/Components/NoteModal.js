import React, { useState } from "react";
import { Modal, Row, Col, Switch } from "antd";
import moment from "moment";
import ReactCardFlip from "react-card-flip";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function NoteModal({ visible, setVisible }) {
  const [note, setNote] = useState("");
  const [view, setView] = useState(false);

  const NoteInput = () => (
    <textarea
      className="form-control"
      style={{ height: "40vh", resize: "none" }}
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );

  const NoteView = () => {
    return <div className="form-control" style={{ height: "40vh" }}>
      <ReactMarkdown plugins={[gfm]} children={note} />
    </div>;
  };

  return (
    <Modal
      title={`Add New Note - ${moment().fromNow()}`}
      centered
      visible={visible}
      onOk={() => console.log("OK Clicked inside Modal")}
      onCancel={() => {
        console.log("Modal Cancelled");
        setVisible(false);
      }}
      footer={null}
      width={"50%"}
    >
      <div>
        <ReactCardFlip isFlipped={view} flipDirection="horizontal">
          <NoteView />
          <NoteInput />
        </ReactCardFlip>
        <Row style={{ paddingTop: 10 }} justify="end">
          {!view && <Col span={2}>View</Col>}
          <Col span={2}>
            <Switch
              checkedChildren={"View"}
              checked={view}
              onChange={setView}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
