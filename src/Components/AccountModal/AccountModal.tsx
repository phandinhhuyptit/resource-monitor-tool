import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
import { Row, Col, Modal, Button, Form, Input, Checkbox, Select } from "antd";
import { Wrapper } from "./AccountModal.styles";

const plainOptions = ["Facebook", "Google", "Youtube"];

interface Props {
  isAccountPopup: boolean;
  setIsAccountPopup: Dispatch<SetStateAction<boolean>>;
  handleCreateCrawlerAccounts: (inputs: any, reset: any) => void;
  handleUpdateCrawlerAccount: (id: any, inputs: any) => void;
  mutationLoadingCreate: boolean;
  mutationLoadingUpdate: boolean;
  account: any;
  type: string;
}

const { Option } = Select;

const options = [
  { label: "Get Public Post", value: "post" },
  { label: "Get Public Commen", value: "pear" },
  { label: "Search Keyword", value: "keyword" },
  { label: "Detect User/Page", value: "detect" },
  { label: "Get Source Categories", value: "categories" },
  { label: "Run ExtensionV3", value: "extensionv3" },
  { label: "Get Posts New system", value: "system" },
];

const CrawlerAcountModal: React.FC<Props> = (props) => {
  const {
    mutationLoadingCreate: loading,
    mutationLoadingUpdate: loadingUpdate,
    handleCreateCrawlerAccounts,
    handleUpdateCrawlerAccount,
    isAccountPopup,
    setIsAccountPopup,
    account,
    type,
  } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [activeOn, setActiveOn] = useState([]);
  useEffect(() => {
    if (account && type === "edit") {
      setUsername(account.username);
      setEmail(account.email);
      setPhone(account.phone);
      setPassword(account.password);
      setActiveOn(account.active_on);
    }
  }, [account, type]);

  const handleCancel = () => {
    setIsAccountPopup(false);
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setActiveOn([]);
  };

  const handleChangeActiveOn = (value) => {
    setActiveOn(value);
  };

  const onSubmmitCrawlerAccount = () => {
    if (type === "create") {
      const inputs = [
        {
          username,
          email,
          phone,
          password,
          token,
          platform,
          active_on: activeOn,
        },
      ];

      handleCreateCrawlerAccounts(inputs, handleCancel);
    } else {
      const input = {
        username,
        email,
        phone,
        password,
        token: token ? token : undefined,
        platform: platform ? platform : undefined,
        active_on: activeOn,
      };
      handleUpdateCrawlerAccount(account._id, input);
    }
  };

  return (
    <Modal
      visible={isAccountPopup}
      title={"Create Accounts"}
      //   onOk={this.handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading || loadingUpdate}
          onClick={onSubmmitCrawlerAccount}
        >
          {type === "create" ? "Create" : "Edit"}
        </Button>,
      ]}
    >
      <Wrapper>
        <Form>
          <Row gutter={18}>
            <Col span={12}>
              <div className="label">Email</div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder={"Enter email"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="label">Phone</div>
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
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder={"Enter phone"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={12}>
              <div className="label">UID</div>

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
                  placeholder={"Enter name"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="label">Password</div>
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
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder={"Password"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={12}>
              <div className="label">User Name</div>

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
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder={"User name"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="label">Access Token</div>
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
                  placeholder={"Access Token"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            {/* <Col span={12}>
              <div className="label">Token Type</div>
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
                  defaultValue="employee"
                  style={{ width: 120 }}
                  // onChange={handleChange}
                >
                  <Option value="employee">Employee</Option>
                  <Option value="company">Company</Option>
                </Select>
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <div className="label">Active on</div>
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
                <Select
                  showArrow={false}
                  mode="tags"
                  value={activeOn}
                  style={{ width: "100%" }}
                  placeholder="192.168.1.179"
                  onChange={handleChangeActiveOn}
                />

                {/* <Input
                  type="text"
                  // onChange={(e) => this.setState({ cityName: e.target.value })}
                  // value={cityName}
                  placeholder={"192..168.1.179"}
                /> */}
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <div className="label">Token Mission</div>
            <Form.Item
              // label={"Search Platform"}
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
                options={options}
                // defaultValue={["Apple"]}
                // onChange={onChange}
              />
            </Form.Item>
          </Row> */}
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default CrawlerAcountModal;
