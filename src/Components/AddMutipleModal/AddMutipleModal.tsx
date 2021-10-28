import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Row, Col, Modal, Button, Form, Input, Checkbox, Select } from 'antd';
import { Wrapper } from './AddMutipleModal.styles';
import { useMutation } from '@apollo/client';

interface Props {
  isGroupPopup: boolean;
  setIsGroupPopup: Dispatch<SetStateAction<boolean>>;
  handleCreateSource: (inputs: any, reset: any) => void;
  mutationLoading: boolean;
  group: any;
  loadingUpdate: boolean;
  handleUpdateGroup: (id: any, input: any) => void;
  type: string;
}

const { Option } = Select;

const AddMutipleModal: React.FC<any> = (props) => {
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
  const [nameIds, setNameAndIds] = useState([]);
  const [priority, setPriority] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [level, setLevel] = useState<any>('');
  const [messagesPriority, setMessagesPriority] = useState('');
  const [messagesPrivacy, setMessagesPrivacy] = useState('');
  const [messagesNameIds, setMessagesNameIds] = useState('');
  const [messagesLevel, setMessagesLevel] = useState('');

  const handleCancel = () => {
    setIsGroupPopup(false);
    setPriority('');
    setPrivacy('');
    setNameAndIds([]);
    setLevel('');
  };

  const onSubmitGroup = () => {
    let arrayGroups: any = [];

    if (!nameIds.length) {
      setMessagesNameIds(`Input ${type} is required`);
    }
    if (!privacy) {
      setMessagesPrivacy('Privacy is required');
    }
    if (!priority) {
      setMessagesPriority('Priority is required');
    }
    if (!level) {
      setMessagesLevel('Level is required');
    }
    if (!privacy || !priority || !nameIds.length || !level) {
      return;
    }

    const regex = /^\d+$/;

    if (nameIds.length) {
      nameIds.forEach((element: any) => {
        let arrayElement = element ? element.split(' ') : [];

        if (arrayElement.length) {
          if (regex.test(arrayElement[0]) && arrayElement[1]) {
            let object = {
              id: arrayElement[0],
              name: arrayElement
                .reduce((acc, value, index) => {
                  if (index === 0) {
                    return acc;
                  }
                  acc.push(value);
                  return acc;
                }, [])
                .join(' ')
                .trim(),
              priority,
              privacy,
              level,
              edge_type: type
            };

            arrayGroups.push(object);
          } else {
            setMessagesNameIds('Format ID and Name is wrong. Please check again');
          }
        }
      });

      if (nameIds.length === arrayGroups.length) {
        setMessagesNameIds('');
      }
    }

    if (privacy) {
      setMessagesPrivacy('');
    }
    if (priority) {
      setMessagesPriority('');
    }

    if (level) {
      setMessagesLevel('');
    }

    if (privacy && priority && level && nameIds.length === arrayGroups.length) {
      handleCreateSource(arrayGroups, handleCancel());
    }
  };

  return (
    <Modal
      visible={isGroupPopup}
      title={`Add Mutiple`}
      afterClose={handleCancel}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={mutationLoading || loadingUpdate} onClick={onSubmitGroup}>
          Add
          {/* {type === 'create' ? 'Create' : 'Update'} */}
        </Button>
      ]}
    >
      <Wrapper>
        <Form>
          <Row>
            <div>{type === 'group' ? 'Group' : type === 'user' ? 'User' : 'Pages'}</div>
          </Row>

          <Form.Item
            colon={false}
            required
            // hasFeedback={!!messagesPrivacy}
            validateStatus={!messagesNameIds ? 'success' : 'error'}
            help={!messagesNameIds ? null : messagesNameIds}
          >
            <Select
              mode="tags"
              value={nameIds}
              onChange={(value) => {
                setNameAndIds(value);
              }}
              open={false}
              style={{ width: '100%' }}
              filterOption={false}
              allowClear={true}
              placeholder={`Source Format:"ID" + "Name"`}
              tokenSeparators={[',']}
              showArrow={false}
            />

            {/* <Input
              disabled={type === 'edit'}
              type="text"
              onChange={(e) => setNameAndID(e.target.value)}
              value={name}
              placeholder={'Pag name'}
            /> */}
          </Form.Item>

          <Row>
            <div>Privacy</div>
          </Row>
          <Form.Item
            colon={false}
            required
            // hasFeedback={!!messagesPrivacy}
            validateStatus={!messagesPrivacy ? 'success' : 'error'}
            help={!messagesPrivacy ? null : messagesPrivacy}
          >
            <Select
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
            // hasFeedback={!!messagesPrivacy}
            validateStatus={!messagesPriority ? 'success' : 'error'}
            help={!messagesPriority ? null : messagesPriority}
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
            validateStatus={!messagesLevel ? 'success' : 'error'}
            help={!messagesLevel ? null : messagesLevel}
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

export default AddMutipleModal;
