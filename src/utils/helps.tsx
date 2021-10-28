import { RouteType } from "./__globalGenerated__";
import { Route } from "react-router-dom";

export const renderRoutes = (routes: Array<RouteType>) =>
  routes.map((route: RouteType, key) => {
    const { component: Component, path, exact } = route;

    return Component ? (
      <Route
        key={key || path}
        path={path}
        exact={exact}
        render={(props) => <Component {...props} />}
      />
    ) : null;
  });
