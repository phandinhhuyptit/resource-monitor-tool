import React, { useState, SetStateAction, Dispatch } from "react";
import { Row, Col, Modal, Button, Form, Input, Checkbox } from "antd";
import { Wrapper } from "./NewModal.styles";

const plainOptions = [""];

interface Props {
  isKeywordPopup: boolean;
  setIsKeywordPopup: Dispatch<SetStateAction<boolean>>;
}

const KeywordModal: React.FC<Props> = (props) => {
  const { isKeywordPopup, setIsKeywordPopup } = props;
  const handleCancel = () => {
    setIsKeywordPopup(false);
  };
  return (
    <Modal
      visible={isKeywordPopup}
      title={"Add a new site"}
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
          <div> Site name: </div>
          <Form.Item
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
              placeholder={`Enter site name`}
            />
          </Form.Item>

          <div>Root URL: </div>
          <Form.Item
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
              placeholder={`Enter site name`}
            />
          </Form.Item>
          <Form.Item
            label={"Priority: "}
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
            <Checkbox
            // checked={this.state.checked}
            // disabled={this.state.disabled}
            // onChange={this.onChange}
            >
              {""}
            </Checkbox>
          </Form.Item>
          {/* <Form.Item
          label={<FormattedMessage {...messages.Priority} />}
          colon={false}
          required
          hasFeedback={!!cityValidation.priority}
          validateStatus={!cityValidation.priority ? "success" : "error"}
          help={
            !cityValidation.priority ? null : (
              <FormattedMessage {...messages[cityValidation.priority]} />
            )
          }
        >
          <Input
            type="number"
            onChange={(e) => this.setState({ priority: e.target.value })}
            value={priority}
            placeholder={intl.formatMessage(messages.PriorityPlaceHolder)}
          />
        </Form.Item> */}
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default KeywordModal;
