import React, { lazy, useEffect, useState, Fragment } from "react";

//** Load App
const LazyApp = lazy(() => import("./App"));

/*Hooks*/
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

/*Redux*/
import { getLanguage } from "@store/common/selectors";

const InitApp = ({ DefaultRoute, listRoutes, listNav }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  /*Selectors*/
  const lang = useSelector((state) => getLanguage(state));

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const setupInitApp = async () => {
      setLoaded(true);
    };
    setupInitApp().then();
  }, []);
  return (
    <Fragment>
      <LazyApp DefaultRoute={DefaultRoute} Routes={listRoutes} Nav={listNav} />
    </Fragment>
  );
};
export default InitApp;
