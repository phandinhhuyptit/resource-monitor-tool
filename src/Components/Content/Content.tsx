import React, { Suspense } from "react";
import { ContentWrapper } from "./Content.styles";
import { Spin } from "antd";
import { Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import { renderRoutes } from "../../utils/helps";
import routes from "../../Configs/routesConfig";
const { Content } = Layout;

const ContentDashboard = () => {
  return (
    <ContentWrapper>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spin />
              </div>
            }
          >
            <Switch>
              {renderRoutes(routes)}
              <Redirect exact from="/" to="/keywords" />
              {/* <Redirect to="/404" /> */}
            </Switch>
          </Suspense>
        </div>
      </Content>
    </ContentWrapper>
  );
};

export default ContentDashboard;
