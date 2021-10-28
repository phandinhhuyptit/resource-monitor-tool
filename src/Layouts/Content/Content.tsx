import React, { Suspense } from "react";
// import useRouter from "SMCC/utils/useRouter";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

interface RouteProps extends RouteConfigComponentProps {}
const Dashboard: React.FC<RouteProps> = (props) => {
  const { route } = props;

  // const { history } = useRouter();

  return (
    // <Style>
    <Suspense
      fallback={
        <div className="loading-dashboard">
          <div className="loading-inner">
            <img src={""} width={120} alt="error" />
            <div>Kompa SMCC Dashboard</div>
          </div>
        </div>
      }
    >
      <>
        <div className="main">{renderRoutes(route?.routes)}</div>
      </>
    </Suspense>
    // </Style>
  );
};

export default Dashboard;
