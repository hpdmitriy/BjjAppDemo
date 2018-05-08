import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import { has, find, toLower, isNull } from 'lodash'
import I18n from 'react-native-i18n'
import LessonsActions from '../Redux/LessonsRedux'
import { debugDisplay, trainingStatus, restrictContentByTariff } from '../Services/ApiHelpers'
import Loader from '../Components/Loader'
import OneLesson from '../Components/LessonsList/OneLesson'
import FooterTabs from '../Components/FooterTabs'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import {activeLessonSelectorFactory} from '../selectors'

import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')
const firstIco = require('../Images/Icons/first.png')
const closeIco = require('../Images/Icons/close.png')

class OneLessonScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const screenTitle = has(state.params, 'title')
    const userRole = has(state.params, 'userRole')
    const trainingStatus = has(state.params, 'trainingStatus')
    let rightButton = <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={() => false}>
        <Image style={navStyles.headerNoopButton} source={ noopIco }/>
      </TouchableOpacity>
    if (userRole && toLower(state.params.userRole) === 'student') {
      if(trainingStatus && state.params.trainingStatus === 'NOT_STARTED') {
        rightButton = <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={()=>state.params.createTraining()}>
          <Image style={navStyles.headerFirstButton} source={ firstIco }/>
        </TouchableOpacity>
      }
    }
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {screenTitle ? state.params.title : I18n.t('lessonsScreenTitle')} </Text>
      </View>,
      headerLeft: <View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>{rightButton}</View>,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.object,
    lessonGetByIdRequest: PropTypes.func,
    lessons: PropTypes.object
  }

  componentWillMount () {
    if (!isNull(this.props.activeLesson)) {
      const lessonTrainingStatus = trainingStatus(this.props.activeLesson.trainings, this.props.users.userProfile.id, this.props.activeLesson.id)
      this.props.navigation.setParams({
        userRole: this.props.users.userProfile.role,
        trainingStatus: lessonTrainingStatus,
        createTraining: this.handleLessonCreate
      })
    }
  }
  componentWillReceiveProps(newProps) {
    if(newProps.activeLesson === undefined || this.props.activeLesson === undefined) return null
    const currentLessonTrainingStatus = trainingStatus(this.props.activeLesson.trainings, this.props.users.userProfile.id, this.props.activeLesson.id)
    const newLessonTrainingStatus = trainingStatus(newProps.activeLesson.trainings, newProps.users.userProfile.id, newProps.activeLesson.id)
    if(currentLessonTrainingStatus !== newLessonTrainingStatus) {
      this.props.navigation.setParams({
        userRole: newProps.users.userProfile.role,
        trainingStatus: newLessonTrainingStatus,
      })
    }
  }
  handleLessonCreate = () => {
    const restrictContent = restrictContentByTariff(this.props.users, this.props.activeLesson.access_tags);
    if(+restrictContent === 0) {
      this.props.lessonCreateTrainingRequest(this.props.activeLesson.id, this.props.users.token)
    } else {
      Alert.alert(
        I18n.t('tariffNotAllowTraining'),
        I18n.t('tariffNeedChange'),
        [
          {
            text: 'OK',
            onPress: () => null,
            style: {color: "#f11c1d"}
          },
        ],
        {cancelable: false}
      );
    }
  }
  render () {

    debugDisplay('oneLesson Screen', this.props)
    const activeLesson = find(this.props.lessons.lessonList.rows, (lesson) => lesson.id === this.props.navigation.state.params.id)
    return (
      <View style={[styles.grayContainer]}>

        <OneLesson
          orientation={this.props.orientation}
          dimensions={this.props.dimensions}
          data={activeLesson}
          user={this.props.users}
          navigate={this.props.navigation.navigate}
        />

        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={'TechniquesScreen'}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['lessons']}
          callRout={this.props.navigation.state.routeName}
        />

      </View>
    )

  }
}


const mapStateToProps = () => {
  const activeLesson = activeLessonSelectorFactory()

  return (state) => {
    return {
      lessons: state.lessons,
      users: state.users,
      activeLesson: activeLesson(state)
    }
  }
}
// const mapStateToProps = ({lessons, users, nav}) => {
//   const hasLessonsList = has(lessons, ['lessonList', 'rows']);
//   const lessonId = nav.routes[nav.index].params.id
//   return {
//     lessons: lessons,
//     users: users,
//     activeLesson: hasLessonsList ? find(lessons.lessonList.rows, (lesson) => lesson.id === lessonId) : null
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    lessonGetByIdRequest: (id, token) => {
      dispatch(LessonsActions.lessonGetByIdRequest(id, token))
    },
    lessonCreateTrainingRequest: (id, token) => {
      dispatch(LessonsActions.lessonCreateTrainingRequest(id, token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(OneLessonScreen))
