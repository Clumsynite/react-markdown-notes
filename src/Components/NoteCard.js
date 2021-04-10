import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import moment from "moment";
import { Icon } from "@iconify/react";
import deleteIcon from "@iconify-icons/carbon/delete";

export default function NoteCard({ note, index, deleteNote }) {
  const { created, body, title, backgroundColor } = note;

  const DeleteNote = () => {
    return (
      <div
        style={{ display: "contents", cursor: "pointer" }}
        onClick={() => deleteNote(index)}
        title="Delete Note"
      >
        <Icon icon={deleteIcon} color="#f00" width="30" height="30" />
      </div>
    );
  };

  return (
    <Card
      title={`${title} - ${moment(created).fromNow()}`}
      extra={<DeleteNote />}
      style={{
        height: "45vh",
        overflowY: "auto",
        width: "60vw",
        margin: "10px 0",
        backgroundColor,
      }}
      hoverable
      bordered
    >
      <ReactMarkdown plugins={[gfm]} children={body} />
    </Card>
  );
}
