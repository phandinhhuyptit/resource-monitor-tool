import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Row, Col, Modal, Button, Form, Input, Checkbox, Select } from 'antd';
import { Wrapper } from './GroupModal.styles';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

const plainOptions = ['Facebook', 'Google', 'Youtube'];

interface Props {
  isGroupPopup: boolean;
  setIsGroupPopup: Dispatch<SetStateAction<boolean>>;
  handleCreateSource: (inputs: any, reset: any) => void;
  mutationLoading: boolean;
  type: string;
  group: any;
  loadingUpdate: boolean;
  handleUpdateGroup: (id: any, input: any) => void;
}

const { Option } = Select;

const GroupModal: React.FC<Props> = (props) => {
  const {
    loadingUpdate,
    handleUpdateGroup,
    isGroupPopup,
    setIsGroupPopup,
    handleCreateSource,
    mutationLoading,
    group,
    type
  } = props;
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [priority, setPriority] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [level, setLevel] = useState<any>('');

  useEffect(() => {
    if (type === 'edit' && group) {
      setID(group.id);
      setPriority(group.priority);
      setPrivacy(group.privacy);
      setName(group.name);
      setLevel(group.level ? group.level : '');
    }
  }, [group, type]);

  const handleCancel = () => {
    setIsGroupPopup(false);
    setID('');
    setPriority('');
    setPrivacy('');
    setName('');
    setLevel('');
  };

  const onSubmitGroup = () => {
    if (type === 'create') {
      const inputs = [
        {
          id: id,
          name,
          priority,
          privacy,
          edge_type: 'group',
          level: level ? level : undefined
        }
      ];
      handleCreateSource(inputs, handleCancel);
    } else {
      const input = {
        priority,
        level
      };
      handleUpdateGroup(group._id, input);
    }
  };

  return (
    <Modal
      visible={isGroupPopup}
      title={`${type === 'create' ? 'Create' : 'Update'} Groups`}
      onCancel={handleCancel}
      afterClose={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={mutationLoading || loadingUpdate} onClick={onSubmitGroup}>
          {type === 'create' ? 'Create' : 'Update'}
        </Button>
      ]}
    >
      <Wrapper>
        <Form>
          <Row>
            <div>ID</div>
          </Row>
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
              disabled={type === 'edit'}
              type="text"
              onChange={(e) => setID(e.target.value)}
              value={id}
              placeholder={'ID'}
            />
          </Form.Item>
          <Row>
            <div>Name</div>
          </Row>

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
              disabled={type === 'edit'}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={'Name'}
            />
          </Form.Item>

          <Row>
            <div>Privacy</div>
          </Row>
          <Form.Item
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
              disabled={type === 'edit'}
              defaultValue=""
              value={privacy}
              style={{ width: 120 }}
              onChange={(value) => {
                setPrivacy(value);
              }}
            >
              <Option value="">Select</Option>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>

              <Option value="secret">Secret</Option>
            </Select>
          </Form.Item>
          <Row>
            <div>Priority</div>
          </Row>
          <Form.Item
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
              value={priority}
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value) => {
                setPriority(value);
              }}
            >
              <Option value="">Select</Option>
              <Option value="NORMAL">Normal</Option>
              <Option value="HIGH">High</Option>
              <Option value="KOLS">Kols</Option>
            </Select>
          </Form.Item>
          <Row>
            <div>Level</div>
          </Row>
          <Form.Item
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
              // disabled={type === 'edit'}
              defaultValue=""
              value={level}
              style={{ width: 120 }}
              onChange={(value) => {
                setLevel(Number(value));
              }}
            >
              <Option value="">Select</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>

              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Form.Item>
          {/* <Row>
            <div>Crawl Since</div>
          </Row>
          <Form.Item
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
              defaultValue="normal"
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              <Option value="now">Now</Option>
              <Option value="2">1 week</Option>
              <Option value="3">2 weeks</Option>
              <Option value="4">3 weeks</Option>
              <Option value="5">30 Days</Option>
              <Option value="6">60 Days</Option>
              <Option value="7">90 Days</Option>
              <Option value="8">120 Days</Option>
            </Select>
          </Form.Item>
          <Row>
            <div>Add multiple public group</div>
          </Row>
          <Form.Item
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
            <Input.TextArea
              autoSize={{ minRows: 4, maxRows: 4 }}
              // onChange={(e) => this.setState({ cityName: e.target.value })}
              // value={cityName}
              placeholder={`Format: Id [space] Name`}
            />
          </Form.Item>
          <Row>
            <div>Secret Group</div>
          </Row>
          <Form.Item
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
            <Input
              type="text"
              // onChange={(e) => this.setState({ cityName: e.target.value })}
              // value={cityName}
              placeholder={`UID that joined to private/secret group`}
            />
          </Form.Item> */}
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default GroupModal;
