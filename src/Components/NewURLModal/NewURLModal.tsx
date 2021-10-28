import React, { useState, SetStateAction, Dispatch } from "react";
import { Row, Col, Modal, Button, Form, Input, Checkbox } from "antd";
import { Wrapper } from "./NewURLModal.styleds";

const plainOptions = [""];

interface Props {
  isNewURLPopup: boolean;
  setIsNewURLPopup: Dispatch<SetStateAction<boolean>>;
}

const KeywordModal: React.FC<Props> = (props) => {
  const { isNewURLPopup, setIsNewURLPopup } = props;
  const handleCancel = () => {
    setIsNewURLPopup(false);
  };
  return (
    <Modal
      visible={isNewURLPopup}
      title={"Add New URL"}
      //   onOk={this.handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          //   loading={loading}
          //   onClick={this.handleOk}
        >
          Create
        </Button>,
      ]}
    >
      <Wrapper>
        <Form>
          <Form.Item
            label={"New seed url:"}
            colon={false}
            required
            //   hasFeedback={!!cityValidation.cityName}
            //   validateStatus={!cityValidation.cityName ? "success" : "error"}
            //   help={
            //     !cityValidation.cityName ? null : (
            //       <FormattedMessage {...messages[cityValidation.cityName]} />
            //     )
            //   }
          >
            <Input
              type="text"
              // onChange={(e) => this.setState({ cityName: e.target.value })}
              // value={cityName}
              placeholder={`Enter new seed url`}
            />
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default KeywordModal;
