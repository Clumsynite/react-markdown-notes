import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import moment from "moment";

export default function NoteCard({ note }) {
  const { created, body, title } = note;

  return (
    <Card
      title={`${title} - ${moment(created).fromNow()}`}
      style={{ height: "40vh", overflowY: "auto", width: "60vw" }}
      hoverable
      bordered
    >
      <ReactMarkdown plugins={[gfm]} children={body} />
    </Card>
  );
}
