import { isNull, values, has, isEmpty, get } from 'lodash'
import I18n from 'react-native-i18n'
const errors = {
  TOKEN_ERROR: {
    title: I18n.t('tokenErrorMessage'),
    message: I18n.t('tokenErrorMessage'),
    comment: null,
    action: {
      navigate: 'LoginScreen',
      params: {error: 'token'}
    }
  },
  LESSON_NOT_FOUND: {
    title: I18n.t('lessonNotFoundErrorTitle'),
    message: I18n.t('lessonNotFoundErrorMessage'),
    comment: null,
    action: {
      navigate: 'TechniquesScreen',
      params: null
    }
  },
  ACCESS_DENIED: {
    title: I18n.t('accessDeniedTitle'),
    message: I18n.t('accessDeniedMessage'),
    comment: null,
    action: {
      navigate: 'LoginScreen',
      params: null
    }
  },
  TRAINING_CAN_CLOSE_ONLY_STUDENT_OF_TRANING: {
    title: 'TRAINING CAN NOT BE CLOSED',
    message: 'Training can close only student of traning',
    comment: null,
    action: null,
  },
  INVALID_PARAMS: {
    title: I18n.t('invalidParamsTitle'),
    message: I18n.t('invalidParamsMessage'),
    comment: null,
    action: null,
    repeat: true,
  },
  INVALID_CONFIRM_CODE_OR_PHONENO: {
    title: I18n.t('invalidConfirmTitle'),
    message: I18n.t('invalidConfirmMessage'),
    comment: null,
    action: null,
    repeat: true,
  },
  INVALID_ACTION_NAME: {
    title: 'INVALID ACTION',
    message: 'Action does not exist.',
    comment: null,
    action: null,
  },
  INVALID_COMMAND_NAME: {
    title: 'INVALID COMMAND',
    message: 'The name of the command is not specified, or there is no such command.',
    comment: null,
    action: null,
  },
  INVALID_CREDENTIALS: {
    title: I18n.t('invalidCredentialsTitle'),
    message: I18n.t('invalidCredentialsMessage'),
    comment: null,
    action: null,
    repeat: true,
  },
  INTERNAL_SERVER_ERROR: {
    title: 'SERVER ERROR',
    message: 'Please try again later.',
    comment: null,
    action: null,
    repeat: true,
  },
  REPEATED_UPLOAD: {
    title: I18n.t('attachmentRepeatUploadTitle'),
    message: I18n.t('attachmentRepeatUploadMessage'),
    comment: null,
    action: {
      navigate: 'AttachmentsScreen',
    },
  },
  FILE_IS_LARGE: {
    title: I18n.t('attachmentBigSizeTitle'),
    message: I18n.t('attachmentBigSizeMessage'),
    comment: null,
    action: {
      navigate: 'AttachmentsScreen',
    },
  }
}

function errorHandler (error = null, route = null, routeParams = null) {
  if (isNull(route)) {
    return null
  }
  if (isNull(error) || isEmpty(error)) {
    return null
  }
  if (isEmpty(error[route])) {
    return null
  }
  const takeError = error[route]
  const finalError = has(takeError, 'code') ? get(errors, takeError.code) : errors.INTERNAL_SERVER_ERROR
  if (has(takeError, 'details')) {
    finalError.comment = values(takeError.details).join('\n')
  }
  return finalError
}

export {
  errorHandler,
  errors
}
