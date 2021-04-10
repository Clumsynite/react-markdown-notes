import React, { useState } from "react";
import { Modal, Row, Col, Switch, message } from "antd";
import { Icon } from "@iconify/react";
import saveIcon from "@iconify-icons/carbon/save";
import checkmarkOutline from "@iconify-icons/carbon/checkmark-outline";
import editIcon from "@iconify-icons/carbon/edit";
import ReactCardFlip from "react-card-flip";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import moment from "moment";
import { CompactPicker } from "react-color";

const ModalTitle = ({ title, setTitle }) => {
  const [edit, setEdit] = useState(true);

  return (
    <Row align="middle">
      <Col span={14}>
        {edit ? (
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          `${title} - ${moment().fromNow()}`
        )}
      </Col>
      <Col span={4} style={{ paddingLeft: 4 }}>
        {edit ? (
          <div
            style={{ display: "contents", cursor: "pointer" }}
            onClick={() => {
              if (title.trim().length > 0) {
                setEdit(false);
              } else {
                message.error("Can't set title empty");
              }
            }}
          >
            <Icon
              icon={checkmarkOutline}
              color="#bebebe"
              height={38}
              width={38}
            />
          </div>
        ) : (
          <div
            style={{ display: "contents", cursor: "pointer" }}
            onClick={() => setEdit(true)}
          >
            <Icon icon={editIcon} color="#bebebe" height={38} width={38} />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default function NoteModal({ visible, setVisible }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [view, setView] = useState(false);
  const [color, setColor] = useState("#fff");

  const generalHeight = "50vh";

  const NoteView = () => {
    return (
      <div
        className="form-control"
        style={{
          height: generalHeight,
          overflowY: "auto",
          backgroundColor: color,
        }}
      >
        <ReactMarkdown plugins={[gfm]} children={note} />
      </div>
    );
  };

  const onNoteSave = () => {
    if (title.trim().length < 1) {
      message.error("Title Can't be empty");
      return false;
    } else if (note.trim().length < 1) {
      message.error("Can't save empty note");
      return false;
    } else {
      let notes = JSON.parse(localStorage.notes || "[]");
      let currentNote = {
        created: new Date(),
        body: note,
        title,
        backgroundColor: color,
      };
      let newNotes = [...notes, currentNote];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      setNote("");
      setTitle("");
      setVisible(false);
      message.success("Note saved successfully");
    }
  };

  return (
    <Modal
      title={<ModalTitle title={title} setTitle={setTitle} />}
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
            style={{
              height: generalHeight,
              resize: "none",
              backgroundColor: color,
            }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <NoteView />
        </ReactCardFlip>
        <Row style={{ paddingTop: 10 }} align="middle">
          <Col span={10}>
            <CompactPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          </Col>
          {!view && (
            <Col offset={4} span={2}>
              View
            </Col>
          )}
          <Col offset={view ? 6 : 0} span={2}>
            <Switch
              checkedChildren={"View"}
              checked={view}
              onChange={setView}
            />
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <div
              style={{ cursor: "pointer", display: "contents" }}
              onClick={onNoteSave}
              title="Save Note"
            >
              <Icon icon={saveIcon} color="#bebebe" width="50" height="50" />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
