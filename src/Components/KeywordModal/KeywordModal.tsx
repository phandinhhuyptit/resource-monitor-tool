import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
import { Row, Col, Modal, Button, Form, Input, Checkbox } from "antd";

const plainOptions = [
  { label: "Facebook", value: "facebook_search" },
  { label: "Google", value: "google_search" },
  { label: "Linkedin", value: "linkedin_search" },
];

interface Params {
  keyword: string | null;
  search_type: Array<string>;
}
interface Props {
  isKeywordPopup: boolean;
  setIsKeywordPopup: Dispatch<SetStateAction<boolean>>;
  handleCreateKeyWord: (input: Params, reset: any) => void;
  mutationLoading: boolean;
  type: string;
  keyword: any;
  handleUpdateKeyword: (input: any) => void;
}

const KeywordModal: React.FC<Props> = (props) => {
  const {
    keyword: keywordData,
    type,
    handleUpdateKeyword,
    isKeywordPopup,
    setIsKeywordPopup,
    handleCreateKeyWord,
    mutationLoading,
  } = props;
  const [keyword, setKeyWord] = useState<string>("");
  const [searchType, setSearchType] = useState<Array<string>>([]);
  const handleCancel = () => {
    setIsKeywordPopup(false);
    setKeyWord("");
    setSearchType([]);
  };

  const handleSearchType = (value) => {
    setSearchType(value);
  };

  const handleKeyword = (value) => {
    setKeyWord(value);
  };

  useEffect(() => {
    if (keywordData && type === "edit") {
      setSearchType(keywordData.search_type);
      setKeyWord(keywordData.keyword);
    }
    return () => {
      setSearchType([]);
      setKeyWord("");
    };
  }, [keywordData, type]);

  const onSubmmitKeyWords = () => {
    if (type === "create") {
      const input = {
        keyword,
        search_type: searchType,
      };
      handleCreateKeyWord(input, handleCancel);
    } else {
      const input = {
        keyword,
        search_type: searchType,
        _id: keywordData._id,
      };
      handleUpdateKeyword(input);
    }
  };

  return (
    <Modal
      visible={isKeywordPopup}
      title={type === "create" ? "Create Keywords" : "Edit Keywords"}
      //   onOk={this.handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={mutationLoading}
          onClick={onSubmmitKeyWords}
        >
          {type === "create" ? "Create" : "Edit"}
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          label={"Keyword"}
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
          <Input.TextArea
            autoSize={{ minRows: 6, maxRows: 6 }}
            onChange={(e) => handleKeyword(e.target.value)}
            value={keyword}
            placeholder={`Keyword Format: "main key" + "sub key 1" + "sub key 2" + subkey3`}
          />
        </Form.Item>
        <Form.Item
          label={"Search Platform"}
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
          <Checkbox.Group
            options={plainOptions}
            defaultValue={[]}
            value={searchType}
            onChange={(value) => {
              handleSearchType(value);
            }}
          />
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
    </Modal>
  );
};

export default KeywordModal;
