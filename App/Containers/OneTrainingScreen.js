import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import { has, find, toLower, isNull, isNil } from 'lodash'
import I18n from 'react-native-i18n'
import TrainingsActions from '../Redux/TrainingsRedux'
import { debugDisplay, trainingStatus, restrictContentByTariff } from '../Services/ApiHelpers'
import Loader from '../Components/Loader'
import Scored from '../Components/Scored'
import BackgroundImage from '../Components/BackgroundImage'
import MessagesList from '../Components/TrainingsList/MessagesList'
import FooterMessenger from '../Components/FooterMessenger'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import { ACTIVE_TRAINING_STATUSES, TRAINING_NEW_MESSAGE_FOR_MARK } from '../Config/Constants'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')
const cameraIco = require('../Images/Icons/camera.png')
const closeIco = require('../Images/Icons/close.png')
const firstIco = require('../Images/Icons/first.png')
const chatBg = require('../Images/fixture/chat-bg.png')

class OneTrainingScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const screenTitle = has(state.params, 'title')
    const userRole = has(state.params, 'userRole')
    const trainingStatus = has(state.params, 'trainingStatus')

    let rightButton = <View style={[navStyles.headerRightButtonWrap]}>
      <TouchableOpacity onPress={() => false}>
        <Image style={navStyles.headerNoopButton} source={ noopIco }/>
      </TouchableOpacity>
    </View>
    if (userRole && toLower(state.params.userRole) === 'student') {
      if (trainingStatus && !!~ACTIVE_TRAINING_STATUSES.indexOf(state.params.trainingStatus)) {
        rightButton = <View style={[navStyles.headerRightDoubleButtonWrap]}>
          <TouchableOpacity key="add" style={navStyles.headerRightButtonWrap}
                            onPress={() => state.params.handlerSendVideo()}>
            <Image style={navStyles.headerCameraButton} source={ cameraIco }/>
          </TouchableOpacity>
          <TouchableOpacity key="close" style={navStyles.headerRightButtonWrap}
                            onPress={() => state.params.handlerCloseTraining(state.params.trainingStatus)}>
            <Image style={navStyles.headerCloseButton} source={ closeIco }/>
          </TouchableOpacity>
        </View>
      }
    }
    if (userRole && toLower(state.params.userRole) === 'teacher') {
      rightButton = <View style={[navStyles.headerRightDoubleButtonWrap]}>
        <TouchableOpacity key="scored" style={navStyles.headerRightButtonWrap}
                          onPress={() => state.params.handlerScoreTrainingOpen()}>
          <Image style={navStyles.headerFirstButton} source={ firstIco }/>
        </TouchableOpacity>
      </View>
    }
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {screenTitle ? state.params.title : I18n.t('trainingsScreenTitle')} </Text>
      </View>,
      headerLeft: <View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: rightButton
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    trainingGetByIdRequest: PropTypes.func,
    trainings: PropTypes.object
  }
  state = {
    scoredVisible: false
  }

  componentWillMount () {
    this.props.trainingGetByIdRequest(this.props.navigation.state.params.id, this.props.user.token)
  }

  componentDidMount () {
    if (!isNull(this.props.trainings.activeTraining)) {
      const trainingTrainingStatus = trainingStatus(
        this.props.trainings.activeTraining.training_status,
        this.props.user.userProfile.id,
        this.props.trainings.activeTraining.id)
      this.props.navigation.setParams({
        userRole: this.props.user.userProfile.role,
        trainingStatus: trainingTrainingStatus,
        handlerCloseTraining: this.handlerCloseTraining,
        handlerSendVideo: this.handlerSendVideo,
        handlerScoreTrainingOpen: this.handlerScoreTrainingOpen
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if ((!isNull(newProps.trainings.activeTraining) && isNull(this.props.trainings.activeTraining)) ||
      (!isNull(newProps.trainings.activeTraining) && !isNull(this.props.trainings.activeTraining) &&
      newProps.trainings.activeTraining.id !== this.props.trainings.activeTraining.id)
    ) {
      const trainingTrainingStatus = trainingStatus(
        newProps.trainings.activeTraining.training_status,
        this.props.user.userProfile.id,
        newProps.trainings.activeTraining.id
      )
      this.props.navigation.setParams({
        userRole: this.props.user.userProfile.role,
        trainingStatus: trainingTrainingStatus,
        handlerSendVideo: this.handlerSendVideo,
        handlerCloseTraining: this.handlerCloseTraining,
        handlerScoreTrainingOpen: this.handlerScoreTrainingOpen
      })
    } else  return null

  }

  navigateToVideoUploader = (id) => {
    this.props.navigation.navigate('AttachmentsScreen', {
      event: TRAINING_NEW_MESSAGE_FOR_MARK,
      trainingId: id,

    })
  }
  handlerCloseTraining = (status) => {
    if (!!~ACTIVE_TRAINING_STATUSES.indexOf(status)) {
      return Alert.alert(
        I18n.t('trainingNotDoneCloseTitle'),
        I18n.t('trainingNotDoneCloseMessage'),
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
          {
            text: 'OK',
            onPress: () => this.props.trainingCloseRequest(
              this.props.trainings.activeTraining.id,
              true,
              this.props.user.token
            ),
            style: {color: '#f11c1d'}
          },
        ],
        {cancelable: true}
      )
    }
  }

  handlerSendVideo = () => {
    const {activeTraining} = this.props.trainings
    const activeTrainingStatus = trainingStatus(activeTraining.training_status, this.props.user.userProfile.id, activeTraining.id)
    if (activeTrainingStatus === 'STARTED' || activeTrainingStatus === 'MARKED') {
      return this.navigateToVideoUploader(activeTraining.id)
    }
    if (activeTrainingStatus === 'AWAITING') {
      return Alert.alert(
        I18n.t('trainingAwaitingTitle'),
        I18n.t('trainingAwaitingMessage'),
        [
          {
            text: 'OK',
            onPress: () => null,
            style: {color: '#f11c1d'}
          },
        ],
        {cancelable: true}
      )
    }
  }
  handlerScoreTrainingOpen = () => {
    const {mark_reason_message_id, training_status} = this.props.trainings.activeTraining
    if (mark_reason_message_id === null || training_status !== 'waiting_teacher_mark') {
      return Alert.alert(
        I18n.t('noVideoToScoreTitle'),
        I18n.t('noVideoToScoreMessage'),
        [
          {
            text: 'OK',
            onPress: () => null,
            style: {color: '#f11c1d'}
          },
        ],
        {cancelable: false}
      )
    } else {
      const {scoredVisible} = this.state
      return this.setState({scoredVisible: !scoredVisible})
    }
  }
  handlerScoreTraining = (mark, text) => {
    const {mark_reason_message_id, id, training_status} = this.props.trainings.activeTraining
    if(training_status === 'waiting_teacher_mark') {
      return this.props.trainingScoreVideoRequest(
        id,
        mark_reason_message_id,
        text,
        mark,
        this.props.user.token
      )
    } else {
      return this.handlerScoreTrainingOpen()
    }
  }

  render () {
    debugDisplay('oneTraining Screen', this.props)
    const {trainingsList, activeTraining} = this.props.trainings
    const {scoredVisible} = this.state
    /*
     if(isNull(activeTraining) && isNull(trainingsList)) {
     return null
     }
     */
    const currentTraining = !isNull(activeTraining) ? activeTraining : null
    return (
      <View style={[styles.grayContainer]}>

        <BackgroundImage source={ chatBg }/>

        {!isNull(currentTraining) && !scoredVisible ? <MessagesList
          orientation={this.props.orientation}
          dimensions={this.props.dimensions}
          data={currentTraining}
          userId={this.props.user.userProfile.id}
        /> : null
        }
        {!isNull(currentTraining) && !scoredVisible && !!~ACTIVE_TRAINING_STATUSES.indexOf(this.props.navigation.state.params.trainingStatus) ?
          <FooterMessenger dimensions={this.props.dimensions} trainingId={currentTraining.id}/> : null
        }
        {scoredVisible ? <Scored onPress={this.handlerScoreTraining}
                                 onCancelPress={this.handlerScoreTrainingOpen} type="VideoScored"/> : null}
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['trainings']}
          callRout={this.props.navigation.state.routeName}
        />
      </View>
    )

  }
}

const mapStateToProps = ({trainings, users, nav}) => {
  /*
   const hasTrainingsList = has(trainings, ['trainingList', 'rows']);
   const trainingId = nav.routes[nav.index].params.id
   */
  return {
    trainings: trainings,
    user: users,
    //activeTraining: hasTrainingsList ? find(trainings.trainingList.rows, (training) => training.id === trainingId) : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trainingGetByIdRequest: (id, token) => {
      dispatch(TrainingsActions.trainingGetByIdRequest(id, token))
    },
    trainingCreateTrainingRequest: (id, token) => {
      dispatch(TrainingsActions.trainingCreateTrainingRequest(id, token))
    },
    trainingCloseRequest: (trainingId, ignoreMark, token) => {
      dispatch(TrainingsActions.trainingCloseRequest(trainingId, ignoreMark, token))
    },
    trainingScoreVideoRequest: (trainingId, replyMessageId, text, mark, token) => {
      dispatch(TrainingsActions.trainingScoreVideoRequest(trainingId, replyMessageId, text, mark, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(OneTrainingScreen))
