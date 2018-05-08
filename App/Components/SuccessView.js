import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import RoundButton from './RoundButton'
import * as Animatable from 'react-native-animatable'
import { isNull, isEmpty, assignIn, has, difference } from 'lodash'
import { successHandler, success as successList } from '../Controllers/SuccessHandler'
import SuccessActions from '../Redux/SuccessRedux'
import UsersActions from '../Redux/UsersRedux'
import EventsActions from '../Redux/EventsRedux'
import MaterialsActions from '../Redux/MaterialsRedux'
import TechniquesActions from '../Redux/TechniquesRedux'
import LessonsActions from '../Redux/LessonsRedux'
import TrainingsActions from '../Redux/TrainingsRedux'
import AttachmentsActions from '../Redux/AttachmentsRedux';
import { successSelector } from '../selectors'
import { Metrics, Fonts } from '../Themes/'
import styles from './Styles/LoaderStyles'

class SuccessView extends Component {
  static propTypes = {
    nav: PropTypes.object,
    operate: PropTypes.array,
    checkObj: PropTypes.object,
    navigationNavigate: PropTypes.func,
    cancelHandler: PropTypes.func,
    forcedSuccess: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    callRout: PropTypes.string
  }
  static defaultProps = {
    forcedSuccess: null,
  }

  shouldComponentUpdate () {
    return this.props.nav.routes[this.props.nav.index].routeName === this.props.callRout
  }

  componentWillMount () {
    console.log(`-->SuccessView Mount Rout ${this.props.nav.routes[this.props.nav.index].routeName} --- ${this.props.callRout}`)
    if (this.props.nav.routes[this.props.nav.index].routeName === this.props.callRout) {
      const currentRout = this.props.nav.routes[this.props.nav.index].routeName
      const success = this.getSuccess(this.props.operate, this.props.checkObj)
      if (isNull(this.props.forcedSuccess) && !isEmpty(success)) {
        return this.props.writeSuccess(currentRout, [...success])
      }
    }
  }

  componentWillReceiveProps (newProps) {

    const currentRout = this.props.nav.routes[this.props.nav.index].routeName
    if (isNull(this.props.forcedSuccess)) {
      const success = [...this.getSuccess(newProps.operate, newProps.checkObj)]
      const oldSuccess = [...this.getSuccess(this.props.operate, this.props.checkObj)]
      //const oldSuccess = has(this.props.success, ['screenSuccess',currentRout]) ? this.props.success.screenSuccess[currentRout] : []
      const diffSuccess = difference(success, oldSuccess)
      if (!isEmpty(diffSuccess)) {
        return this.props.writeSuccess(currentRout, success)
      }
    }
  }

  componentWillUnmount () {
    isNull(this.props.forcedSuccess) && this.props.writeSuccess(this.props.nav.routes[this.props.nav.index].routeName, null)
    console.log(`==>SuccessView UnMount ||| Rout ${this.props.nav.routes[this.props.nav.index].routeName}`)
  }

  componentDidUpdate (prevProps) {
    const currentRout = this.props.nav.routes[this.props.nav.index].routeName
    const {forcedSuccess} = prevProps
    const prevSuccess = isNull(forcedSuccess) ? successHandler(prevProps.success.screenSuccess, currentRout) : successList[forcedSuccess]
    const thisSuccess = isNull(forcedSuccess) ? successHandler(this.props.success.screenSuccess, currentRout) : successList[forcedSuccess]
    console.log(`Prev = ${prevProps.success.screenSuccess[currentRout]}\n This = ${this.props.success.screenSuccess[currentRout]}`)
    if(prevProps.success.screenSuccess[currentRout] !== this.props.success.screenSuccess[currentRout]) {
      if (has(prevSuccess, 'action') && isNull(prevSuccess.action)) {
        const {repeat, pending} = prevSuccess
        return this.cleanSuccess(false, undefined, false, repeat, pending)
      }
      if (has(thisSuccess, 'action') && isNull(thisSuccess.action)) {
        const {repeat, pending} = thisSuccess
        return this.cleanSuccess(false, undefined, false, repeat, pending)
      }
    }
  }

  getSuccess = (operate, checkObj) => {
    let assignProps = new Set()
    operate.forEach((item) => {
      const propsItem = checkObj[item].success
      if (!isNull(propsItem)) assignProps.add(propsItem)
    })
    return assignProps
  }
  cleanSuccess = (navigator = false, navigatorParams = undefined, navigate = false, repeat = false, pending = false) => {
    console.log('============CLEAN_SUCCESS==============')
    if (!isNull(this.props.cancelHandler) && navigator !== 'close') {
      this.props.cancelHandler({repeat: repeat, pending: pending})
    }
    if (!isNull(this.props.cancelHandler) && navigator === 'close') {
      this.props.cancelHandler({repeat: false, pending: false})
    }
    const setOperate = new Set(this.props.operate)
    if (setOperate.has('events')) {
      this.props.clearEventsSuccess()
    }
    if (setOperate.has('users')) {
      this.props.clearUserSuccess()
    }
    if (setOperate.has('materials')) {
      this.props.clearMaterialsSuccess()
    }
    if (setOperate.has('techniques')) {
      this.props.clearTechniqueSuccess()
    }
    if (setOperate.has('lessons')) {
      this.props.clearLessonSuccess()
    }
    if (setOperate.has('trainings')) {
      this.props.clearTrainingSuccess()
    }
    if (setOperate.has('attachments')) {
      this.props.clearAttachmentSuccess()
    }
    /*
     if (setOperate.has('trainings')) {
     this.props.clearTrainingSuccess()
     }
     */
    if (navigator !== 'close' && typeof navigate === 'function') {
      navigate(navigator, navigatorParams)
    }
    return null
  }

  render () {
    const currentRout = this.props.nav.routes[this.props.nav.index].routeName
    const {forcedSuccess} = this.props
    const visible = !isNull(forcedSuccess) ||
      (has(this.props.success, ['screenSuccess', currentRout]) && !isEmpty(this.props.success.screenSuccess[currentRout]))
    console.log(this.props.success);
    if (visible) {
      const success = isNull(forcedSuccess) ? successHandler(this.props.success.screenSuccess, currentRout) : successList[forcedSuccess]
      const _navigator = has(success, ['action', 'navigate']) ? success.action.navigate : false
      let _navigatorParams = has(success, ['action', 'params']) ? success.action.params : undefined
      const _navigate = has(success, ['action', 'navigate']) ? this.props.navigationNavigate : false
      const _repeat = has(success, 'repeat') ? success.repeat : false
      const _pending = has(success, 'pending') ? success.pending : false
      if(_navigatorParams === 'getInCreatedTraining') {
        _navigatorParams = {id: this.props.createdTraining.id}
      }
      if(_navigatorParams === 'goToActiveTraining') {
        _navigatorParams = {id: this.props.activeTraining.id, title: this.props.activeTraining.lesson.title}
      }
      return (
        <Animatable.View animation='fadeIn' iterationCount={1}>
          <View>
            <Text allowFontScaling style={styles.title}>
              {success.title || success.code}
            </Text>
            <Text allowFontScaling style={styles.message}>
              {success.message}
            </Text>
            <Text allowFontScaling style={styles.message}>
              {success.comment || success.details}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            { !isNull(success.action) ? <RoundButton
              spaced
              text={I18n.t('continue')}
              dopStyles={{
                paddingLeft: 40,
                paddingRight: 40
              }}
              dopTextStyles={{
                fontSize: Fonts.size.regular,
                marginVertical: Metrics.baseMargin
              }}
              onPress={() => this.cleanSuccess(_navigator, _navigatorParams, _navigate, _repeat, _pending)}
            /> : null
            }
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
    success: successSelector(state),
    nav: state.nav,
    createdTraining: state.lessons.createdTraining,
    activeTraining: state.trainings.activeTraining
  }
)
const mapDispatchToProps = (dispatch) => (
  {
    writeSuccess: (screen, success) => {
      dispatch(SuccessActions.writeSuccess(screen, success))
    },
    clearUserSuccess: () => {
      dispatch(UsersActions.clearUserSuccess())
    },
    clearEventsSuccess: () => {
      dispatch(EventsActions.clearEventsSuccess())
    },
    clearMaterialsSuccess: () => {
      dispatch(MaterialsActions.clearMaterialsSuccess())
    },
    clearTechniqueSuccess: () => {
      dispatch(TechniquesActions.clearTechniqueSuccess())
    },
    clearLessonSuccess: () => {
      dispatch(LessonsActions.clearLessonSuccess())
    },
    clearTrainingSuccess: () => {
      dispatch(TrainingsActions.clearTrainingSuccess())
    },
    clearAttachmentSuccess: () => {
      dispatch(AttachmentsActions.clearAttachmentSuccess())
    }
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(SuccessView)
