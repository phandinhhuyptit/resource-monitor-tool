import React from "react";
import Header from "../../Components/Header";
import { Layout } from "antd";
import Sider from "../../Components/Sider";
import Content from "../../Components/Content";

const Dashboard = () => {
  return (
    <Layout>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
