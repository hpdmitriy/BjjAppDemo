import {get, has, isEmpty, isNull} from 'lodash';
import I18n from 'react-native-i18n';

const success = {
  USER_REGISTER_BY_PHONE_NUMBER_SUCCESS: {
    title: I18n.t('regSuccessTitle'),
    message: I18n.t('regSuccessMessage'),
    comment: null,
    action: {
      navigate: 'FinishRegistrationScreen',
      params: null
    }
  },
  USER_GET_PROFILE_SUCCESS: {
    title: 'TRAINING CAN NOT BE CLOSED',
    message: 'Training can close only student of training',
    comment: null,
    action: null
  },
  USER_IS_LOGIN_SUCCESS: {
    title: I18n.t('loginSuccessTitle'),
    message: I18n.t('loginSuccessMessage'),
    comment: null,
    action: {
      navigate: 'EventsScreen',
      params: null
    },
  },
  USER_CONFIRM_PHONE_SUCCESS: {
    title: I18n.t('confirmPhoneSuccessTitle'),
    message: I18n.t('confirmPhoneSuccessMessage'),
    comment: null,
    action: {
      navigate: 'EventsScreen',
      params: null
    }
  },
  PHONE_NUMBER_NO_CONFIRM: {
    title: I18n.t('loginSuccessTitle'),
    message: I18n.t('loginSuccessMessageNoPhoneConfirm'),
    comment: null,
    action: {
      navigate: 'FinishRegistrationScreen',
      params: null
    }
  },
  LESSON_GET_LIST_SUCCESS: {
    title: null,
    message: null,
    comment: null,
    action: null,
    repeat: false,
  },
  LESSON_SET_FAVORITE_FLAG_SUCCESS: {
    title: I18n.t('successDefaultTitle'),
    message: I18n.t('toFavoritesMessage'),
    comment: null,
    action: {
      navigate: 'close'
    },
    repeat: true,
    pending: true
  },
  LESSON_SET_RATING_SUCCESS: {
    title: I18n.t('successDefaultTitle'),
    message: I18n.t('lessonScoredMessage'),
    comment: null,
    action: {
      navigate: 'close'
    },
    repeat: true,
    pending: true
  },
  LESSON_CREATE_TRAINING_SUCCESS: {
    title: I18n.t('successCreateTrainingTitle'),
    message: I18n.t('successCreateTrainingMessage'),
    comment: null,
    action: {
      navigate: 'OneTrainingScreen',
      params: 'getInCreatedTraining'
    },
    repeat: false,
    pending: true
  },
  ATTACHMENT_UPLOAD_TO_YOUTUBE_SUCCESS: {
    title: I18n.t('attachmentSuccessUploadTitle'),
    message: I18n.t('attachmentSuccessUploadMessage'),
    comment: null,
    action: {
      navigate: 'OneTrainingScreen',
      params: 'goToActiveTraining'
    },
    repeat: false,
    pending: true
  },
  SUCCESS_DEFAULT: {
    title: null,
    message: null,
    comment: null,
    action: null
  },

  SUCCESS_DEFAULT_NAVIGATE: {
    title: I18n.t('successDefaultTitle'),
    message: I18n.t('successDefaultMessage'),
    comment: null,
    action: null
  }
};

function successHandler(action = null, route = null, routeParams = null) {
  if (isNull(route)) {
    return null;
  }
  if (isNull(action) || isEmpty(action) || isEmpty(action[route])) {
    return null;
  }
  return has(success, action[route]) ? get(success, action[route]) : success.SUCCESS_DEFAULT;
}

export {
  successHandler
};
