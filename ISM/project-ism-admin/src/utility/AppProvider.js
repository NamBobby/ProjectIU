import React, { lazy } from 'react';

import Modules from '@Modules';

export async function initApp(isAuthenticated) {
  // eslint-disable-next-line no-use-before-define
  const resModules = await initModules(isAuthenticated);
  return { resModules };
}

async function initModules(isAuthenticated) {
  try {
    const listRoutes = [];
    const listUrl = {};
    let listRedux = {};
    let listSagas = [];
    let listCache = [];
    let listLangVi = {};
    let listLangEn = {};

    for (let i = 0; i < Modules.length; i++) {
      const module = Modules[i];
      let res = null;

      try {
        res = require(`@Modules/${module.key}/bootstrap`);
      } catch (error) {
        console.log(`Module ${module.key} does not exist!`);
      }
      if (res) {
        const { default: moduleConfig } = res;
        const moduleAuthenticated =
          moduleConfig.isAuthenticate !== undefined
            ? moduleConfig.isAuthenticate
            : true;
        if (
          isAuthenticated === moduleAuthenticated ||
          moduleAuthenticated === 'Any'
        ) {
          if (moduleConfig.sagas !== undefined) {
            listSagas = [...listSagas, ...moduleConfig.sagas];
          }
          if (moduleConfig.persistBlacklist !== undefined) {
            listCache = [...listCache, ...moduleConfig.persistBlacklist];
          }
          if (moduleConfig.routes !== undefined) {
            for (let j = 0; j < moduleConfig.routes.length; j++) {
              const route = moduleConfig.routes[j];
              // eslint-disable-next-line no-use-before-define
              listRoutes.push(
                createRouterModule(
                  route,
                  moduleConfig.dir,
                  moduleConfig.pathRoot === undefined
                    ? ''
                    : moduleConfig.pathRoot
                )
              );
              if (moduleConfig.redux !== undefined) {
                listRedux = { ...listRedux, ...moduleConfig.redux };
              }
              if (moduleConfig.lang !== undefined) {
                if (moduleConfig.lang.vi !== undefined) {
                  listLangVi = { ...listLangVi, ...moduleConfig.lang.vi };
                }
                if (moduleConfig.lang.en !== undefined) {
                  listLangEn = { ...listLangEn, ...moduleConfig.lang.en };
                }
              }
            }
          }
        }
      }
    }

    return {
      listRoutes,
      listUrl,
      listSagas,
      listRedux,
      listCache,
      listLangVi,
      listLangEn,
    };
  } catch (e) {
    console.log(e);
  }
}

function createRouterModule(route, moduleDir, pathRoot) {
  const pathR = pathRoot !== undefined && pathRoot ? `/${pathRoot}/` : '/';
  const lazyComponent = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */
      `@Modules/${moduleDir}/${route.component}`
    )
  );
  const result = {
    component: lazyComponent,
    path: pathR + route.url,
  };
  if (route.layout !== undefined) {
    result['layout'] = route.layout;
  }
  if (route.meta !== undefined) {
    result['meta'] = route.meta;
  }
  const props = route.props ? { ...route.props } : {};
  return {
    ...result,
    ...props,
  };
}
