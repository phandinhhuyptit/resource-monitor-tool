import React from 'react';
import Header from '../../Components/Header';
import { Layout } from 'antd';
import Sider from '../../Components/Sider';
import Content from '../../Components/Content';

const Dashboard = () => {
  return (
    <Layout
      style={{
        minWidth: '1300px',
        overflowX: 'scroll'
      }}
    >
      <Sider />
      <Layout className="site-layout">
        <Content />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
