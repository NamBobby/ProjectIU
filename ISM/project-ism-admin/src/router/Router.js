// ** React Imports
import React, { Suspense, useContext, lazy, useState, useEffect } from "react";

/*Store state Redux Saga */
import { useSelector } from "react-redux";

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from "@layouts/layout-wrapper";

// ** Router Components
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import LoginLayout from "@layouts/LoginLayout";

import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

const Router = ({ Routes }) => {
  // ** Hooks
  const { t } = useTranslation();

  const auth = JSON.parse(localStorage.getItem("persist:Auth"));
  let accessToken = auth?.accessToken;
  if (accessToken) {
    accessToken = JSON.parse(accessToken);
  }

  // ** Init Error Component
  const Error = lazy(() => import("@layouts/pages/404"));

  // ** Default Layout
  const DefaultLayout = "BlankLayout";

  // ** All of the available layouts
  const Layouts = {
    BlankLayout,
    LoginLayout,
  };

  // ** Current Active Item
  const currentActiveItem = null;

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (Routes) {
      Routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  // ** Return Route to Render
  const ResolveRoutes = () => {
    const arrRoute = Object.keys(Layouts).map((layout, index) => {
      const LayoutTag = Layouts[layout];
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Suspense
                          fallback={<div style={{ height: "100vh" }}></div>}
                        >
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            /*eslint-disable */
                            {...(route.appLayout
                              ? {
                                  appLayout: route.appLayout,
                                }
                              : {})}
                            {...(route.meta
                              ? {
                                  routeMeta: route.meta,
                                }
                              : {})}
                            {...(route.className
                              ? {
                                  wrapperClass: route.className,
                                }
                              : {})}
                            /*eslint-enable */
                          >
                            {route.titleI18n || route.title ? (
                              <Helmet>
                                <title>
                                  {route.titleI18n
                                    ? t(route.titleI18n)
                                    : route.title}
                                </title>
                              </Helmet>
                            ) : null}
                            <route.component {...props} />
                            {/* <FinalRoute route={route} {...props} /> */}
                          </LayoutWrapper>
                        </Suspense>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
    return arrRoute;
  };

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {ResolveRoutes()}
        {/* NotFound Error page */}
        <Route path="*" component={Error} />
      </Switch>
    </AppRouter>
  );
};

export default Router;
