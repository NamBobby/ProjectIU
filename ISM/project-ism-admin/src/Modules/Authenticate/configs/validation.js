import * as Yup from 'yup'
import {messageError} from '@utils'

export const getValueForm = (valuesDefault = {}) => {
  return {
    username: '',
    password: '',
    ...valuesDefault
  }
}

export const validationSchema = i18n => {
  return Yup.object().shape({
    username: Yup.string()
      .nullable()
      .required(
        messageError(
          i18n.t('validation:required'),
          i18n.t('FormSignIn:field:user_name')
        )
      ),
    password: Yup.string()
      .nullable()
      .required(
        messageError(
          i18n.t('validation:required'),
          i18n.t('FormSignIn:field:password')
        )
      )
  })
}
