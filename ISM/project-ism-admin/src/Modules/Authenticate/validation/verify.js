import * as Yup from 'yup'
import { messageError } from '@utils'

export const getValueForm = (valuesDefault = {}) => {
  return {
      otp: null,
      ...valuesDefault
  }
}

export const validationSchema = i18n => {
  return Yup.object().shape({
      otp: Yup.string().nullable()
          .required(messageError(i18n.t("validation:required"), i18n.t("FormVerifyAccount:field:otp")))
  })
}
