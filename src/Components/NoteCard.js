import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import moment from "moment";

export default function NoteCard({ note, index }) {
  const { created, body, title } = note;

  const DeleteNote = () => {
    return <div style={{ display: "contents", cursor: "pointer" }}></div>;
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
      }}
      hoverable
      bordered
    >
      <ReactMarkdown plugins={[gfm]} children={body} />
    </Card>
  );
}
