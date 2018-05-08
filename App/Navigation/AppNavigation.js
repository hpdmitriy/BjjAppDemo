import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import FinishRegistrationScreen from '../Containers/FinishRegistrationScreen'
import EventsScreen from '../Containers/EventsScreen'
import OneEventScreen from '../Containers/OneEventScreen'
import MaterialsScreen from '../Containers/MaterialsScreen'
import OneMaterialCategoryScreen from '../Containers/OneMaterialCategoryScreen'
import OneMaterialScreen from '../Containers/OneMaterialScreen'
import TechniquesScreen from '../Containers/TechniquesScreen'
import LessonsScreen from '../Containers/LessonsScreen'
import TrainingsScreen from '../Containers/TrainingsScreen'
import OneLessonScreen from '../Containers/OneLessonScreen'
import OneTrainingScreen from '../Containers/OneTrainingScreen'
import AttachmentsScreen from '../Containers/AttachmentsScreen'
import ProfileScreen from '../Containers/ProfileScreen'

import styles from './Styles/NavigationStyles'

const PrimaryNav = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  FinishRegistrationScreen: {
    screen: FinishRegistrationScreen
  },
  EventsScreen: {
    screen: EventsScreen
  },
  OneEventScreen: {
    screen: OneEventScreen
  },
  MaterialsScreen: {
    screen: MaterialsScreen,
  },
  OneMaterialCategoryScreen: {
    screen: OneMaterialCategoryScreen,
  },
  OneMaterialScreen: {
    screen: OneMaterialScreen,
  },
  TechniquesScreen: {
    screen: TechniquesScreen,
  },
  LessonsScreen: {
    screen: LessonsScreen,
  },
  OneLessonScreen: {
    screen: OneLessonScreen,
  },
  TrainingsScreen: {
    screen: TrainingsScreen,
  },
  OneTrainingScreen: {
    screen: OneTrainingScreen,
  },
  AttachmentsScreen: {
    screen: AttachmentsScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen
  }

}, {
  //headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  //initialRouteName: 'AttachmentsScreen',
  //initialRouteName: 'TrainingsScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  }
})

export default PrimaryNav
