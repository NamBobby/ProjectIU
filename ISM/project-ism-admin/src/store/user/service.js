import API from "../../configs/api"
import apiMethod from "@utility/ApiMethod"

export const getInfoUser = ({ payload, codeLanguage }) => {
  return apiMethod.get(
    codeLanguage + API.GET_ACCOUNT_PROFILE + `?useId=${payload?.userId}`
  )
}

export const getGeneralInfoMenu = ({ payload, codeLanguage }) => {
  return apiMethod.get(codeLanguage + API.GET_GENERAL_INFO_MENU, payload)
}
