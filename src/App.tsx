import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { NotificationContainer } from "react-notifications";
import Spinners from "./Components/Spinners";
import { USER_LOGIN, IS_LOGGED_IN } from "./graphqls/Queries/Query";
const Error = lazy(() => import("./Pages/Error"));
const DashboardLayout = lazy(() => import("./Layouts/Dashboard"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Error404 = lazy(() => import("./Pages/Error/404"));

const App = (props: any) => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <div>
      <Suspense fallback={<Spinners />}>
        <Switch>
          <Route
            exact
            path="/login"
            // name="Dashboard"
            render={(props: any) => {
              if (data.isLoggedIn) {
                return <Redirect to="/" />;
              }
              return <Login {...props} />;
            }}
          />
          <Route
            exact
            path="/500"
            // name="Error 5050"
            render={(props: any) => <Error {...props} />}
          />

          <Route
            exact
            path="/404"
            // name="Error 404"
            render={(props: any) => <Error404 {...props} />}
          />
          <Route
            exact
            path="/*"
            // name="Dashboard"
            render={(props: any) => {
              if (!data.isLoggedIn) {
                return <Redirect to="/login" />;
              }

              return <DashboardLayout {...props} />;
            }}
          />
        </Switch>
      </Suspense>
      <NotificationContainer />
    </div>
  );
};

export default App;
