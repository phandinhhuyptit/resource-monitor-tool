import styled from "styled-components";

export const SiderWrapper = styled.div`
  height: 100vh;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  .title-wrapper {
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: 600;
    color: #a4a6b3;
  }

  .image-logo {
    padding-right: 6px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .ant-layout-sider {
    height: 100vh;
  }
`;
