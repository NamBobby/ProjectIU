import React, { Suspense, lazy, useEffect, useState } from "react";
/*Store state Redux Saga */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import { all } from "@redux-saga/core/effects";
import storage from "redux-persist/lib/storage";

import initRedux from "@store/redux";
import initSagas from "@store/sagas";
import { initApp } from "@utility/AppProvider";

/* Language */
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import intlMessagesEn from "@src/i18n/localization/en.json";
import intlMessagesVi from "@src/i18n/localization/vi.json";

// ** Router Default
import { DefaultRoute, Routes } from "@src/router/routes";

//** Load App
import InitApp from "./InitApp";

/*Api*/
import apiMethod from "@utility/ApiMethod";
import apiMethodV2 from "@utility/ApiMethodV2";
import apiMethodDev from "@utility/ApiMethodDev";

import Spinner from "@components/spinner/fallback-spinner";

const Bootstrap = () => {
  const [loaded, setLoaded] = useState(false);
  const userSelector = JSON.parse(localStorage.getItem("persist:user"));
  const userData = userSelector && JSON.parse(userSelector?.userData);
  const accessToken = localStorage.getItem("accessToken");

  const [modules, setModules] = useState({
    listRoutes: [],
    listCache: [],
    listRedux: initRedux,
    listSagas: initSagas,
    listLangVi: intlMessagesVi,
    listLangEn: intlMessagesEn,
  });

  useEffect(() => {
    const isAuthenticated = accessToken ? true : false;
    if (isAuthenticated) {
      apiMethod.defaults.headers.common["Authorization"] = accessToken;
      apiMethodV2.defaults.headers.common["Authorization"] = accessToken;
      apiMethodDev.defaults.headers.common["Authorization"] = accessToken;
    }
    const setupApp = async () => {
      const res = await initApp(isAuthenticated);
      const { resModules } = res;
      setModules({
        listRoutes: [...Routes, ...resModules.listRoutes],
        listCache: Object.values({ ...resModules.listCache }),
        listRedux: { ...initRedux, ...resModules.listRedux },
        listSagas: [...initSagas, ...resModules.listSagas],
        listLangVi: { ...intlMessagesVi, ...resModules.listLangVi },
        listLangEn: { ...intlMessagesEn, ...resModules.listLangEn },
      });
      setLoaded(true);
    };
    setupApp().then();
  }, [JSON.stringify(accessToken)]);

  const {
    listRedux,
    listSagas,
    listRoutes,
    listCache,
    listLangVi,
    listLangEn,
    listNav,
  } = modules;

  if (loaded) {
    /*setup redux*/
    const persistConfig = {
      key: "root",
      transforms: [immutableTransform()],
      storage,
      blacklist: listCache,
    };
    const composeEnhancers =
      process.env.NODE_ENV === "development"
        ? composeWithDevTools({
            realtime: true,
          })
        : compose;
    const rootReducer = combineReducers(listRedux);
    const rootSaga = function* () {
      yield all(listSagas);
    };
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const middleware = [];
    middleware.push(sagaMiddleware);
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
    const store = createStore(persistedReducer, enhancer);
    const persist = persistStore(store);
    sagaMiddleware.run(rootSaga);
    /*End redux*/

    /*Setup language*/
    i18next.use(initReactI18next).init({
      fallbackLng: "vi",
      lng: "vi",
      resources: {
        en: listLangEn,
        vi: listLangVi,
      },
      // have a common namespace used around the full app
      ns: ["common"],
      defaultNS: "common",
      debug: false,
      // cache: {
      //   enabled: true
      // },
      interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
      },
    });
    /*End Setup language*/
    return (
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          <PersistGate loading={null} persistor={persist}>
            <I18nextProvider i18n={i18next}>
              <InitApp
                DefaultRoute={DefaultRoute}
                listRoutes={listRoutes}
                listNav={listNav}
              />
            </I18nextProvider>
          </PersistGate>
        </Suspense>
      </Provider>
    );
  }
  return null;
};
export default Bootstrap;
