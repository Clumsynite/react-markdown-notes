import React from "react";
import { Row, Col, Typography } from "antd";

import { Icon } from "@iconify/react";
import addAlt from "@iconify-icons/carbon/add-alt";

const { Title } = Typography;

export default function Heading({ onClick }) {
  return (
    <Row
      className="shadow-sm p-3 mb-5 bg-body rounded"
      align="middle"
      justify="center"
    >
      <Col offset={2} span={10}>
        <Title>Clumsyknight's Notebook</Title>
      </Col>
      <Col span={4}>
        <button
          className="btn btn-outline-success d-flex align-items-center justify-content-between"
          onClick={onClick}
        >
          <div style={{ paddingRight: 4 }}>
            <Icon icon={addAlt} width="24" height="24" />
          </div>
          New Note
        </button>
      </Col>
      <Col span={2}></Col>
    </Row>
  );
}
