import React from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HeaderWrapper } from "./Header.styles";
import { isLoggedInVar } from "../../graphqls/cache";
const { Header } = Layout;

const HeaderDashboard = () => {
  const onLogout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    isLoggedInVar(false);
  };

  const menuUser = (
    <Menu>
      <Menu.Item key="setting">
        <Link
          style={{
            color: "black",
          }}
          to="/setting/account"
        >
          <SettingOutlined
            style={{
              marginRight: "5px",
            }}
          />
          Setting
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogout}>
        <PoweroffOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <Dropdown
          overlay={menuUser}
          placement="bottomRight"
          arrow
          trigger={["click"]}
        >
          <Button
            className="user"
            type="primary"
            shape="circle"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Header>
    </HeaderWrapper>
  );
};

export default HeaderDashboard;
