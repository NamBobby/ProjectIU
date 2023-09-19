import { createAction } from "redux-actions"
import { call, put, select } from "redux-saga/effects"
import {
  SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
  RETCODE_SUCCESS
} from "../configs/contants"
import { getCodeLanguage } from "@store/common/selectors"

const PAGE_INIT = PAGE_DEFAULT
const UNIT_INCREASE = 1
const LIMIT = LIMIT_DEFAULT

export const generateListRedux = (name) => {
  const nameUp = name.toUpperCase()

  const types = {
    SET_LIST_LOADING: `SET_LIST_${nameUp}_LOADING`,
    SET_PAGE_LIST_DEFAULT: `SET_PAGE_LIST_${nameUp}_DEFAULT`,
    SET_LIST_LOADING_LOAD_MORE: `SET_LIST_${nameUp}_LOADING_LOAD_MORE`,
    GET_LIST: `GET_LIST_${nameUp}`,
    GET_LIST_SUCCESS: `GET_LIST_${nameUp}_SUCCESS`,
    GET_LIST_FAILED: `GET_LIST_${nameUp}_FAILED`,
    GET_LIST_LOAD_MORE: `GET_LIST_${nameUp}_LOAD_MORE`,
    GET_LIST_LOAD_MORE_SUCCESS: `GET_LIST_${nameUp}_LOAD_MORE_SUCCESS`,
    GET_LIST_LOAD_MORE_FAILED: `GET_LIST_${nameUp}_LOAD_MORE_FAILED`,
    CLEAR_LIST: `CLEAR_LIST_${nameUp}`
  }

  const actions = {
    setListLoading: createAction(types.SET_LIST_LOADING),
    getList: createAction(types.GET_LIST),
    getListSuccess: createAction(types.GET_LIST_SUCCESS),
    getListFailed: createAction(types.GET_LIST_FAILED),
    setPageListDefault: createAction(types.SET_PAGE_LIST_DEFAULT),
    setListLoadingLoadMore: createAction(types.SET_LIST_LOADING_LOAD_MORE),
    getListLoadMore: createAction(types.GET_LIST_LOAD_MORE),
    getListLoadMoreSuccess: createAction(types.GET_LIST_LOAD_MORE_SUCCESS),
    getListLoadMoreFailed: createAction(types.GET_LIST_LOAD_MORE_FAILED),
    clearList: createAction(types.CLEAR_LIST)
  }

  const defaultState = {
    page: PAGE_INIT,
    limit: LIMIT,
    list: [],
    loading: false,
    listMoreLoading: false,
    hasLoadMore: false,
    total: 0,
    error: false
  }

  const handleActions = {
    [types.SET_LIST_LOADING]: (state, { payload }) => {
      return { ...state, loading: payload }
    },
    [types.GET_LIST_SUCCESS]: (state, { payload }) => {
      const { hasMore, total, page, data } = payload
      return {
        ...state,
        page,
        hasLoadMore: hasMore,
        list: data,
        total,
        error: false
      }
    },
    [types.GET_LIST_FAILED]: (state, { payload }) => {
      return {
        page: PAGE_INIT,
        limit: LIMIT,
        list: [],
        total: 0,
        error: true
      }
    },
    [types.SET_PAGE_LIST_DEFAULT]: (state, { payload }) => {
      return {
        ...state,
        page: PAGE_INIT,
        limit: LIMIT
      }
    },
    [types.SET_LIST_LOADING_LOAD_MORE]: (state, { payload }) => {
      return { ...state, listMoreLoading: payload }
    },
    [types.GET_LIST_LOAD_MORE_SUCCESS]: (state, { payload }) => {
      const { hasMore, total, page, data } = payload
      const list = state.list?.concat(data) || []
      return {
        ...state,
        list,
        page,
        hasLoadMore: hasMore,
        total,
        error: false
      }
    },
    [types.GET_LIST_LOAD_MORE_FAILED]: (state, { payload }) => {
      return { ...state, error: true }
    },
    [types.CLEAR_LIST]: (state, { payload }) => {
      return { ...defaultState }
    }
  }

  return {
    types,
    actions,
    defaultState,
    handleActions
  }
}

export const generateListSagas = (actions, service) => {
  return {
    *getList({ payload }) {
      try {
        // console.log("GET LIST CALL GENERATE FUC", payload)
        yield put(actions.setListLoading(true))
        yield put(actions.setPageListDefault())
        const codeLanguage = yield select(getCodeLanguage)
        // console.log("CODE LANG", codeLanguage)
        const res = yield call(service.getListService, {
          payload,
          codeLanguage
        })
        // console.log("RES CALL", res)
        const { data } = res
        if (res.status === SUCCESS) {
          if (data.retCode === RETCODE_SUCCESS) {
            yield put(actions.getListSuccess(data))
          } else {
            yield put(actions.getListFailed())
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        yield put(actions.setListLoading(false))
      }
    },
    *getLoadMoreList({ payload }) {
      try {
        yield put(actions.setListLoadingLoadMore(true))
        const codeLanguage = yield select(getCodeLanguage)
        const res = yield call(service.getListService, {
          payload,
          codeLanguage
        })
        const { data } = res
        if (res.status === SUCCESS) {
          if (data.retCode === RETCODE_SUCCESS) {
            yield put(actions.getListLoadMoreSuccess(res.data))
          } else {
            yield put(actions.getListLoadMoreFailed())
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        yield put(actions.setListLoadingLoadMore(false))
      }
    }
  }
}

export const generateFormSubmitRedux = (name) => {
  const nameUp = name.toUpperCase()
  const types = {
    [`${nameUp}_METHOD`]: `${nameUp}_METHOD`,
    [`${nameUp}_LOADING`]: `${nameUp}_LOADING`,
    [`${nameUp}_SUCCESS`]: `${nameUp}_SUCCESS`,
    [`${nameUp}_ERROR`]: `${nameUp}_ERROR`,
    [`${nameUp}_RESET`]: `${nameUp}_RESET`
  }

  const actions = {
    [`${name}FnMethod`]: createAction(`${nameUp}_METHOD`),
    [`${name}FnLoading`]: createAction(`${nameUp}_LOADING`),
    [`${name}FnSuccess`]: createAction(`${nameUp}_SUCCESS`),
    [`${name}FnError`]: createAction(`${nameUp}_ERROR`),
    [`${name}FnReset`]: createAction(`${nameUp}_RESET`)
  }

  const defaultState = {
    [`${name}Loading`]: false,
    [`${name}Success`]: false,
    [`${name}Error`]: false,
    [`${name}DataResponse`]: null
  }

  const handleActions = {
    [`${nameUp}_LOADING`]: (state, { payload }) => {
      return { ...state, [`${name}Loading`]: payload }
    },
    [`${nameUp}_SUCCESS`]: (state, { payload }) => {
      return {
        ...state,
        [`${name}Error`]: false,
        [`${name}Success`]: true,
        [`${name}DataResponse`]: Array.isArray(payload)
          ? [...payload]
          : typeof payload === "object"
          ? { ...payload }
          : payload
      }
    },
    [`${nameUp}_ERROR`]: (state, { payload }) => {
      return {
        ...state,
        [`${name}Success`]: false,
        [`${name}Error`]: true,
        [`${name}DataResponse`]:
          typeof payload === "object" ? { ...payload } : payload
      }
    },
    [`${nameUp}_RESET`]: (state, { payload }) => {
      return {
        [`${name}Loading`]: false,
        [`${name}Success`]: false,
        [`${name}Error`]: false,
        [`${name}DataResponse`]: payload?.keepDataResponse
          ? state[`${name}DataResponse`]
          : null
      }
    }
  }

  return {
    types,
    actions,
    defaultState,
    handleActions
  }
}

export const generateFormSubmitSagas = (name, actions, service) => {
  return {
    *[`${name}CallMethod`]({ payload }) {
      try {
        yield put(actions[`${name}FnLoading`](true))
        const codeLanguage = yield select(getCodeLanguage)
        const res = yield call(service[`${name}CallMethod`], {
          payload,
          codeLanguage
        })
        const { data } = res
        if (res.status === SUCCESS) {
          if (data.retCode === RETCODE_SUCCESS) {
            yield put(actions[`${name}FnSuccess`](data.data))
          } else {
            yield put(actions[`${name}FnError`]({ error: data }))
          }
        } else {
          yield put(actions[`${name}FnError`]({ error: "system_error" }))
        }
      } catch (e) {
        console.error(e)
        yield put(actions[`${name}FnError`]({ error: "system_error" }))
      } finally {
        yield put(actions[`${name}FnLoading`](false))
      }
    }
  }
}
