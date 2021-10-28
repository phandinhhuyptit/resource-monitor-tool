import React, { useState, SetStateAction, Dispatch } from "react";
import { Row, Col, Modal, Button, Form, Input, Checkbox, Select } from "antd";
import { UPDATE_SOURCES } from "../../graphqls/Mutations/mutation";
import { useMutation } from "@apollo/client";
import { NotificationManager } from "react-notifications";

const plainOptions = ["Facebook", "Google", "Youtube"];

interface Props {
  type?: string;
  refetch?: any;
  ids?: any;
  setDeletesGroups?: any;
  setSelectedAccount?: any;
  isChangeTypePopup: boolean;
  setIsChangeTypePopup: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

const KeywordModal: React.FC<Props> = (props) => {
  const {
    type,
    ids,
    isChangeTypePopup,
    setIsChangeTypePopup,
    refetch,
    setDeletesGroups,
    setSelectedAccount,
  } = props;
  const [edgeType, setEdgeType] = useState<any>(type);
  const handleCancel = () => {
    setIsChangeTypePopup(false);
  };
  const [updateSources, { loading }] = useMutation(UPDATE_SOURCES, {
    update(cache, { data: { updateSources } }) {
      if (updateSources && updateSources.status === 200) {
        NotificationManager.success("Success update", "", 4000);
        setIsChangeTypePopup(false);
        setDeletesGroups([]);
        setSelectedAccount([]);
        refetch();
      } else if (updateSources && updateSources.status !== 200) {
        NotificationManager.error(updateSources.message, "", 4000);
      }
    },
  });

  const onSubmmit = () => {
    updateSources({
      variables: {
        input: {
          ids,
          data_update: {
            edge_type: edgeType,
          },
        },
      },
    });
  };

  return (
    <Modal
      visible={isChangeTypePopup}
      title={"Change Type"}
      //   onOk={this.handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmmit}
        >
          Update
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          label={"Change types"}
          colon={false}
          required
          //   hasFeedback={!!cityValidation.priority}
          //   validateStatus={!cityValidation.priority ? "success" : "error"}
          //   help={
          //     !cityValidation.priority ? null : (
          //       <FormattedMessage {...messages[cityValidation.priority]} />
          //     )
          //   }
        >
          <Select
            defaultValue={type}
            value={edgeType}
            style={{ width: 120 }}
            onChange={(value) => {
              setEdgeType(value);
            }}
          >
            <Option disabled={type === "page"} value="page">
              Page
            </Option>
            <Option disabled={type === "group"} value="group">
              Group
            </Option>
            <Option disabled={type === "user"} value="user">
              User
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KeywordModal;
