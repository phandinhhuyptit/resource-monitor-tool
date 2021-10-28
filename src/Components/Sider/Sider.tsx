import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  ProfileOutlined,
  SettingOutlined,
  CopyOutlined,
  DesktopOutlined,
  LinkedinOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  AppstoreAddOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { SiderWrapper } from './Sider.styles';
import Logo from '../../asset/Icons/logo.svg';
import { isLoggedInVar } from '../../graphqls/cache';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;
const SiderDashboard = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { location } = useHistory();
  const { pathname } = location;
  const handleSelected = () => {
    const keys = {
      1: '/keywords',
      2: '/groups',
      3: '/profiles',
      4: '/pages',
      5: '/accounts',
      6: '/system-user',
      7: '/news',
      8: '/forum',
      9: '/linkedin',
      10: '/ecommerce'
    };
    const selected = Object.keys(keys).find((value) => keys[value] === pathname);
    return selected;
  };

  const onLogout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    isLoggedInVar(false);
  };

  return (
    <SiderWrapper>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(() => !collapsed);
        }}
      >
        <div className="title-wrapper">
          <img className="image-logo" src={Logo} alt="error" />
          {!collapsed && <div className="title">Kompa Monitor</div>}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${handleSelected() || 1}`]}>
          <Item key="1" icon={<KeyOutlined />}>
            <Link to="/keywords"> Keywords</Link>
          </Item>
          <Item key="2" icon={<UsergroupAddOutlined />}>
            <Link to="/groups"> Groups </Link>
          </Item>
          <Item key="3" icon={<ProfileOutlined />}>
            <Link to="/profiles"> Profiles </Link>
          </Item>
          <Item key="4" icon={<CopyOutlined />}>
            <Link to="/pages"> Pages </Link>
          </Item>
          <Item key="5" icon={<UserAddOutlined />}>
            <Link to="/accounts"> Crawler Account </Link>
          </Item>
          <Item key="6" icon={<SettingOutlined />}>
            <Link to="/system-user"> System user </Link>
          </Item>

          <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="Resource">
            <Item key="7" icon={<DesktopOutlined />}>
              <Link to="/news"> News Monitor </Link>
            </Item>
            <Item key="8" icon={<TeamOutlined />}>
              <Link to="/forum"> Forum </Link>
            </Item>
            <Item key="9" icon={<LinkedinOutlined />}>
              <Link to="/linkedin"> Linkedin</Link>
            </Item>

            <Item key="10" icon={<ShoppingCartOutlined />}>
              <Link to="/ecommerce"> Ecommerce</Link>
            </Item>
          </SubMenu>
          <Item onClick={onLogout} key="11" icon={<PoweroffOutlined />}>
            <span> Log out</span>
          </Item>
        </Menu>
      </Sider>
    </SiderWrapper>
  );
};

export default SiderDashboard;
