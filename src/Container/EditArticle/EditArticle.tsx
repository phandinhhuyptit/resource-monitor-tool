import React, { useEffect } from "react";
import { Row, Col, Form, Input, Space, Button } from "antd";
import Wrapper from "./EditArticle.styles";

const EditArticle = () => {
  const object = {
    title: "h1.title",
    text: "div.body",
    description: "div.sapo",
    created_time: {
      selector: "[property='article:published_time']",
      skip_text: false,
      attribute: "content",
      replaces: [
        {
          from: "Hôm nay",
          to: "moment().format('DD/MM/YYYY')",
          isExpression: true,
        },
        {
          from: "Hôm qua",
          to: "moment().subtract(1, 'days').format('DD/MM/YYYY')",
          isExpression: true,
        },
        {
          from:
            "^.*?(\\d{4})-(\\d{1,2})-(\\d{1,2}).*?(\\d{1,2}):(\\d{1,2}):(\\d{1,2}).*?$",
          to: "$3/$2/$1 $4:$5",
          isRegx: true,
        },
      ],
      format: "DD/MM/YYYY HH:mm",
    },
  };

  useEffect(() => {
    const pretty = JSON.stringify(object, undefined, 2);
    let inputElement: any = document.getElementById("myTextArea");
    let inputElement2: any = document.getElementById("myTextArea_2");
    if (inputElement) {
      inputElement.value = pretty;
    }
    if (inputElement2) {
      inputElement2.value = pretty;
    }
  }, []);

  return (
    <Wrapper>
      <Row className="title-wrapper">
        <span className="title">
          Edit article article_processor for anninhthudo.vn
        </span>
      </Row>

      <Row className="input-wrapper">
        <Form.Item
          style={{
            marginBottom: "0",
          }}
          label="Test URL:"
        >
          <Input className="input-url" type="text" placeholder="URL"></Input>
        </Form.Item>
        <Space
          style={{
            marginLeft: "5px",
          }}
          size="middle"
        >
          <Button
            // className="edit"
            // style={{
            //   width: "50px",
            //   padding: 0,
            //   fontSize: "12px",
            //   height: "29px",
            // }}
            size="middle"
            type="primary"
            shape="round"
          >
            Test
          </Button>

          <Button
            // className="del"
            // style={{
            //   width: "50px",
            //   padding: 0,
            //   fontSize: "12px",
            //   height: "29px",
            // }}
            size="middle"
            type="primary"
            shape="round"
          >
            Save
          </Button>
        </Space>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Input.TextArea id="myTextArea" cols={50} rows={20}></Input.TextArea>
        </Col>
        <Col span={12}>
          <Input.TextArea
            id="myTextArea_2"
            cols={50}
            rows={20}
          ></Input.TextArea>
        </Col>
      </Row>
      <div>
        <p
          style={{
            color: "black",
          }}
        >
          {" "}
          Title:{" "}
        </p>
        <p
          style={{
            color: "black",
          }}
        >
          Description:{" "}
        </p>
        <p
          style={{
            color: "black",
          }}
        >
          Publish Date:{" "}
        </p>
        <p
          style={{
            color: "black",
          }}
        >
          Publish Date:{" "}
        </p>
        <p
          style={{
            color: "black",
          }}
        >
          Text:{" "}
        </p>
      </div>
    </Wrapper>
  );
};

export default EditArticle;
