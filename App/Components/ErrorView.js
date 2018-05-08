import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import RoundButton from './RoundButton'
import * as Animatable from 'react-native-animatable'
import { isNull, isEmpty, assignIn, has } from 'lodash'
import { errorHandler, errors as errorsList } from '../Controllers/ErrorHandler'
import UsersActions from '../Redux/UsersRedux'
import ErrorsActions from '../Redux/ErrorsRedux'
import EventsActions from '../Redux/EventsRedux'
import MaterialsActions from '../Redux/MaterialsRedux'
import TechniquesActions from '../Redux/TechniquesRedux'
import LessonsActions from '../Redux/LessonsRedux'
import TrainingsActions from '../Redux/TrainingsRedux'
import AttachmentsActions from '../Redux/AttachmentsRedux';
import { difference } from '../Services/ApiHelpers'
import { Metrics, Fonts } from '../Themes/'
import styles from './Styles/LoaderStyles'
import {errorsSelector} from '../selectors'

class ErrorView extends Component {
  static propTypes = {
    nav: PropTypes.object,
    operate: PropTypes.array,
    checkObj: PropTypes.object,
    navigationNavigate: PropTypes.func,
    cancelHandler: PropTypes.func,
    forcedError: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    callRout: PropTypes.string
  };
  static defaultProps = {
    forcedError: null,
  };

/*
  shouldComponentUpdate () {
    const condition = this.props.nav.routes[this.props.nav.index].routeName === this.props.callRout
    return condition
  }
*/

  componentWillMount() {
    const currentRout = this.props.nav.routes[this.props.nav.index].routeName;
    console.log(`-->ErrorView Mount ||| Rout === ${currentRout}`)
    if(currentRout === this.props.callRout) {
      const errors = this.getErrors(this.props.operate, this.props.checkObj);
      if (isNull(this.props.forcedError) && !isEmpty(errors)) {
        return this.props.writeError(currentRout, errors)
      }
    }
  }
  componentWillReceiveProps (newProps) {
    console.log('@@-->ErrorView newProps ' + this.props.nav.routes[this.props.nav.index].routeName)
    const currentRout = this.props.nav.routes[this.props.nav.index].routeName;
    if(isNull(this.props.forcedError)) {
      const errors = this.getErrors(newProps.operate, newProps.checkObj);
      const diffErrors = difference(errors, this.props.errors.screenErrors[currentRout]);
      if (!isNull(diffErrors) && !isEmpty(diffErrors)) {
        return this.props.writeError(currentRout, errors)
      }
    }
  }
  componentWillUpdate (nextProps, nextState) {
    console.log('@@-->ErrorView Update ' + this.props.nav.routes[this.props.nav.index].routeName)
  }

  componentWillUnmount () {
    isNull(this.props.forcedError) && this.props.writeError(this.props.nav.routes[this.props.nav.index].routeName, {});
    console.log(`==>ErrorView Unmount ||| Rout === Rout ${this.props.nav.routes[this.props.nav.index].routeName}`)
  }

  getErrors = (operate, checkObj) => {
    let assignProps = {};
    operate.forEach((item) => {
      const propsItem = checkObj[item].error || checkObj[item].errors;
      assignIn(assignProps, propsItem)
    });
    return assignProps
  };
  cleanErrors = (navigator = false, navigatorParams = undefined, navigate = false, repeat = false, pending = false) => {
    if (!isNull(this.props.cancelHandler)) {
      this.props.cancelHandler({repeat:repeat, pending: pending});
    }
    const setOperate = new Set(this.props.operate);
    if (setOperate.has('users')) {
      this.props.clearUserErrors()
    }
    if (setOperate.has('events')) {
      this.props.clearEventsErrors()
    }
    if (setOperate.has('materials')) {
      this.props.clearMaterialsErrors()
    }
    if (setOperate.has('techniques')) {
      this.props.clearTechniqueErrors()
    }
    if (setOperate.has('lessons')) {
      this.props.clearLessonErrors()
    }
    if (setOperate.has('trainings')) {
      this.props.clearTrainingErrors()
    }
    if (setOperate.has('attachments')) {
      this.props.clearAttachmentErrors()
    }

    if (navigator && typeof navigate === 'function') {
      navigate(navigator, navigatorParams)
    }
    return null
  };
  render () {
    const currentRout = this.props.nav.routes[this.props.nav.index].routeName;
    const {forcedError} = this.props;
    const visible = !isNull(forcedError) ||
      (has(this.props.errors, ['screenErrors', currentRout]) && !isEmpty(this.props.errors.screenErrors[currentRout]));
    if (visible) {
      const error = isNull(forcedError) ? errorHandler(this.props.errors.screenErrors, currentRout) : errorsList[forcedError];
      const _navigator = has(error, ['action', 'navigate']) ? error.action.navigate : false;
      const _navigatorParams = has(error, ['action', 'params']) ? error.action.params : undefined;
      const _navigate = has(error, ['action', 'navigate']) ? this.props.navigationNavigate : false;
      const _repeat = has(error, 'repeat') ?  error.repeat : false;
      const _pending = has(error, 'pending') ? error.pending : false

      return (
        <Animatable.View animation='fadeIn' iterationCount={1}>
          <View>
            <Text allowFontScaling style={styles.title}>
              {error.title}
            </Text>
            <Text allowFontScaling style={styles.message}>
              {error.message}
            </Text>
            <Text allowFontScaling style={styles.message}>
              {error.comment}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <RoundButton
              spaced
              text={I18n.t('ok')}
              dopStyles={{
                paddingLeft: Metrics.baseMargin * 2,
                paddingRight: Metrics.baseMargin * 2,
                height: 35,
                width: 70,
                alignSelf: 'center'
              }}
              dopTextStyles={{
                fontSize: Fonts.size.regular,
                marginVertical: Metrics.baseMargin
              }}
              onPress={() => this.cleanErrors(_navigator, _navigatorParams, _navigate, _repeat, _pending)}
            />
          </View>
        </Animatable.View>
      )
    } else {
      return null
    }
  }
}
const mapStateToProps = (state) => (
  {
    errors: errorsSelector(state),
    nav: state.nav
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    writeError: (screen, errors) => {
      dispatch(ErrorsActions.writeError(screen, errors))
    },
    clearUserErrors: () => {
      dispatch(UsersActions.clearUserErrors())
    },
    clearEventsErrors: () => {
      dispatch(EventsActions.clearEventsErrors())
    },
    clearMaterialsErrors: () => {
      dispatch(MaterialsActions.clearMaterialsErrors())
    },
    clearTechniqueErrors: () => {
      dispatch(TechniquesActions.clearTechniqueErrors())
    },
    clearLessonErrors: () => {
      dispatch(LessonsActions.clearLessonErrors())
    },
    clearTrainingErrors: () => {
      dispatch(TrainingsActions.clearTrainingErrors())
    },
    clearAttachmentErrors: () => {
      dispatch(AttachmentsActions.clearAttachmentErrors())
    }
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(ErrorView)
