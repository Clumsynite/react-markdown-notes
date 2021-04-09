import React, { useState } from "react";
import { Modal, Row, Col, Switch } from "antd";
import { Icon } from "@iconify/react";
import saveIcon from "@iconify-icons/carbon/save";
import moment from "moment";
import ReactCardFlip from "react-card-flip";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function NoteModal({ visible, setVisible }) {
  const [note, setNote] = useState("");
  const [view, setView] = useState(false);

  const generalHeight = "50vh";

  const NoteView = () => {
    return (
      <div
        className="form-control"
        style={{ height: generalHeight, overflowY: "auto" }}
      >
        <ReactMarkdown plugins={[gfm]} children={note} />
      </div>
    );
  };

  const onNoteSave = () => {
    let notes = JSON.parse(localStorage.notes || "[]");
    let currentNote = {
      date: new Date(),
      body: note,
    };
    let newNotes = [...notes, currentNote];
    console.log("NOTES", newNotes);
    // localStorage.setItem("notes", JSON.stringify(newNotes));
    setNote("");
    // setVisible(false);
  };

  return (
    <Modal
      title={`Add New Note - ${moment().fromNow()}`}
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      width={"50%"}
    >
      <div>
        <ReactCardFlip isFlipped={view} flipDirection="horizontal">
          <textarea
            className="form-control"
            style={{ height: generalHeight, resize: "none" }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <NoteView />
        </ReactCardFlip>
        <Row style={{ paddingTop: 10 }} align="middle">
          {!view && (
            <Col offset={8} span={2} style={{ textAlign: "center" }}>
              View
            </Col>
          )}
          <Col offset={view ? 10 : 0} span={2}>
            <Switch
              checkedChildren={"View"}
              checked={view}
              onChange={setView}
            />
          </Col>
          <Col offset={6} span={6} style={{ textAlign: "right" }}>
            <div
              style={{ cursor: "pointer", display: "contents" }}
              onClick={onNoteSave}
              title="Save Note"
            >
              <Icon icon={saveIcon} color="#000" width="50" height="50" />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
