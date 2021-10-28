import React, { useState } from "react";
import LoginWrapper from "./styles";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";
import { userVar, isLoggedInVar } from "../../graphqls/cache";
import Google from "../../asset/Icons/google.svg";
import { LOGIN } from "../../graphqls/Mutations/mutation";
import { NotificationManager } from "react-notifications";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const history = useHistory();
  const [isChangeLogin, setIsChangeLogin] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      if (login && login.status === 200) {
        NotificationManager.success("Success login", "", 4000);

        setTimeout(() => {
          setIsChangeLogin(true);
          setIsLoading(false);
          login &&
            login.accessToken &&
            localStorage.setItem("accessToken", login.accessToken as string);

          login &&
            login.refreshToken &&
            localStorage.setItem("refreshToken", login.refreshToken as string);
          if (login && login.accessToken) {
            userVar(login.data);
            isLoggedInVar(true);
            login && login.accessToken && history.push("/keywords");
          }
        }, 1000);
      } else if (login && login.status !== 200) {
        setIsLoading(false);
        NotificationManager.error(login.message, "", 4000);
      }
    },
  });

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login({ variables: { input: { username, password } } });
  };

  return (
    <LoginWrapper>
      <Row>
        <Col span={12}>
          <div className="background-image"></div>
        </Col>
        <Col span={12}>
          <div className="login-wrapper">
            <title className="title-login">Login to your account</title>
            <div className="login">
              <div className="form">
                <Row className="item">
                  <Col span={13}>
                    <p className="label">Username</p>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => handleChangeUsername(e)}
                        className="input-username"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="item">
                  <Col span={13}>
                    <p className="label">Password</p>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        onChange={(e) => handlePassword(e)}
                        className="input-password"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="item">
                  <Col
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                    span={13}
                  >
                    <Checkbox className="checkbox">Remember me</Checkbox>
                    <a className="forgot-password">Forgot password </a>
                  </Col>
                </Row>
                <Row className="row-button">
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    span={13}
                  >
                    <Button
                      onClick={handleSubmit}
                      className="register"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Login now
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default Login;
