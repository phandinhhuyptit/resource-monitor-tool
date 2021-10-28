import React, { Suspense } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

interface RouteProps extends RouteConfigComponentProps {}

const Error: React.FC<RouteProps> = (props) => {
  const { route } = props;
  console.log("route", route);
  return (
    <main>
      <Suspense fallback={<div>Loading</div>}>
        {renderRoutes(route?.routes)}
      </Suspense>
    </main>
  );
};

export default Error;
