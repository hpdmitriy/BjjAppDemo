import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {isEmpty, isNull, has} from 'lodash';
import UsersActions from '../Redux/UsersRedux';
import TrainingsActions from '../Redux/TrainingsRedux'
import LessonsActions from '../Redux/LessonsRedux'
import Loader from '../Components/Loader'
import ChangeTariff from '../Components/ChangeTariff';
import Profile from '../Components/Profile';
import I18n from 'react-native-i18n'
import navStyles from '../Navigation/Styles/NavigationStyles'
// Styles
import styles from './Styles/TabScreenStyles';
import profileStyles from './Styles/ProfileScreenStyles';
import {debugDisplay, decodeToken} from '../Services/ApiHelpers';
import FooterTabs from '../Components/FooterTabs'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'


const backIco = require('../Images/Icons/left.png');
const settingsIco = require('../Images/Icons/settings.png');
const profileIco = require('../Images/Icons/profile.png');

class ProfileScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const {goBack} = navigation;
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {I18n.t('profileScreenTitle')} </Text>
      </View>,
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={()=>goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ backIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={() => false}>
          <Image style={navStyles.headerSettingsButton} source={ settingsIco }/>
        </TouchableOpacity>
      </View>,
    }
  };
  static propTypes = {
    dispatch: PropTypes.func,
    userGetProfileRequest: PropTypes.func,
    user: PropTypes.object,
    trainings: PropTypes.object
  };
  static childContextTypes = {
    navigate: PropTypes.func,
    dimensions: PropTypes.object
  };
  getChildContext() {
    return {
      navigate: this.props.navigation.navigate,
      dimensions: this.props.dimensions
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      changeTariffVisible: false
    };
  }

  componentWillMount() {
    const {role, id} = this.props.user.userProfile
    const {token} = this.props.user
    if ((isNull(this.props.user.userProfile) && isNull(this.props.user.token))) {
      this.props.navigation.navigate('LoginScreen');
    }
    if ((isNull(this.props.trainings.trainingsList))) {
      this.props.trainingListRequest(role === 'Student' ? id : null, role !== 'Student' ? id : null, token)
    }
    if ((isNull(this.props.lessons.lessonList))) {
      this.props.lessonGetListRequest(null, token)
    }
  }

  handlerChangeTariffOpen = () => {
      const {changeTariffVisible} = this.state
      return this.setState({changeTariffVisible: !changeTariffVisible})
  }
  handlerChangeTariff = (tariffId, source) => {
    return null
  }

  render() {
    debugDisplay('Profile Screen', this.props);
    const {changeTariffVisible} = this.state
      return (
        <View style={[styles.silverContainer]}>
          <ScrollView style={[profileStyles.container, {marginBottom: 40}]}>
            <Profile
              token={this.props.user.token}
              userProfile={this.props.user.userProfile}
              onPress = {() => null/*this.handlerChangeTariffOpen*/}
            />
          </ScrollView>

          <FooterTabs
            navigate={this.props.navigation.navigate}
            activeTabScreen={'ProfileScreen'}
          />
          {changeTariffVisible ? <ChangeTariff onPress={this.handlerChangeTariff}
                                   onCancelPress={this.handlerChangeTariffOpen} type="VideoScored"/> : null}
          <Loader
            navFunction={this.props.navigation.navigate}
            operate={['users']}
            callRout={this.props.navigation.state.routeName}
          />

        </View>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.users,
    trainings: state.trainings,
    lessons: state.lessons
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userGetProfileRequest: (uid, token) => {
      dispatch(UsersActions.userGetProfileRequest(uid, token));
    },
    trainingListRequest: (studentUserId, teacherUserId, token) => {
      dispatch(TrainingsActions.trainingListRequest(studentUserId, teacherUserId, token))
    },
    lessonGetListRequest: (activeCategory, token) => {
      dispatch(LessonsActions.lessonGetListRequest(activeCategory, token))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(ProfileScreen))
