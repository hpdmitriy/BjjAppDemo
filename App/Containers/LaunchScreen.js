import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ScrollView, Text, View, Button} from 'react-native'
import I18n from 'react-native-i18n'
import {isEmpty, isNil} from 'lodash'
import RoundButton from '../Components/RoundButton'
import UsersActions from '../Redux/UsersRedux'
import HashesActions from '../Redux/HashesRedux'
import {applyLetterSpacing, debugDisplay, decodeToken} from '../Services/ApiHelpers'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  static navigationOptions = {
    title: null,
    headerStyle: {
      elevation: null,
      shadowOpacity: 0,
      height: 0
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    userGetAuthTokenRequest: PropTypes.func,
    users: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      navigator: 'LoginScreen',
      navigate: this.props.navigation.navigate,
      update: null
    }
  }

  componentWillMount() {
    this.setNavigatorScreen(this.props.users)
    /*
     codePush.getUpdateMetadata().then((update) => {

     });
     */
    /*
        PushNotification.localNotification({
          message: "My Notification Message 3",
          smallIcon: "ic_launcher"
        });
    */
  }

  async componentDidMount() {
    //const updates = await codePush.getCurrentPackage();
    /*
     const updates = await codePush.getUpdateMetadata()
     console.log('#######==> CodePush', updates)
     if (updates) {
     this.setState({
     update: {
     label: updates.label,
     version: updates.appVersion,
     description: updates.description
     }
     })
     }
     */

/*

     if (__DEV__ && !isNil(this.props.users.userProfile)/!* && !isNil(this.props.sockets.webSocketConnection.userChannelName)*!/) {
       return null
     setTimeout(
     this.props.navigation.navigate,
     1000,
     //'OneTrainingScreen',
     //'TechniquesScreen',
     'AttachmentsScreen'
     //{id:5, title: 'Test Training'}
     );
     }
*/
     /*     */
    // const clearLogStatus = await AsyncStorage.removeItem('reduxPersist:users');
    // const loginState = await AsyncStorage.getItem('reduxPersist:users');
    // console.log(loginState);
  }

  setNavigatorScreen = (user) => {

    const {userProfile, token, confirmCode} = user
    if (isNil(token)) {
      return this.setState({
        navigator: 'LoginScreen'
      })
    }
    const tokenExp = decodeToken('exp', token) < Date.now() / 1000
    if (isEmpty(userProfile)) {
      return this.setState({
        navigator: 'LoginScreen'
      })
    }
    if (!isEmpty(token) && !isEmpty(userProfile) && userProfile.options.phoneNoConfirmed) {
      return this.setState({
        navigator: tokenExp ? 'LoginScreen' : 'EventsScreen'
      })
    }
    if (!isEmpty(token) && !isEmpty(userProfile) && !userProfile.options.phoneNoConfirmed) {
      return this.setState({
        navigator: 'FinishRegistrationScreen'
      })
    }
    if (!isEmpty(userProfile) && !userProfile.options.phoneNoConfirmed && !isEmpty(confirmCode)) {
      return this.setState({
        navigator: 'FinishRegistrationScreen'
      })
    } else {
      return this.setState({
        navigator: 'LoginScreen'
      })
    }
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    if (this.props.users.token !== newProps.users.token && !isNil(newProps.users.token)) {
      this.setNavigatorScreen(newProps.users)
    }
  }

  /*
   shouldComponentUpdate(nextProps) {
   return nextProps.users.token !== this.props.users.token;
   }
   */

  componentWillUnmount() {
    console.log('Unmaunt Lunchscreen')
  }

  handleAppStateChange = (appState) => {
    if (appState === 'background') {
      // let date = new Date(Date.now() + (this.state.seconds * 1000));
      //
      // if (Platform.OS === 'ios') {
      //   date = date.toISOString();
      // }

      // PushNotification.localNotification({
      //   message: "My Notification Message 3",
      //   smallIcon: "ic_launcher"
      // });
    }
  }


  render() {
    debugDisplay('Launch Screen Props', this.props)
    const {height} = this.props.dimensions
    return (
      <ScrollView style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContainerContentCenter}>
        <View style={styles.sectionWelcome}>
          <Text style={styles.titleText}>
            {applyLetterSpacing(I18n.t('welcome'))}
          </Text>
          <Text style={styles.sectionText}>
            {I18n.t('welcomeText')}
          </Text>
          <RoundButton
            spaced
            text={I18n.t('continue')}
            navigate={this.state.navigate}
            navigator={this.state.navigator}
            dopStyles={{paddingLeft: 40, paddingRight: 40}}

          />
          {!isNil(this.state.update) && __DEV__ ? <Text style={{color: 'gray', fontSize: 10, marginTop: 20}}>
            App version: {`${this.state.update.version}\n`}
            Release version: {`${this.state.update.label}\n`}
            Description: {`${this.state.update.description}\n`}
            Socket
            chanel: {this.props.sockets.webSocketConnection ? this.props.sockets.webSocketConnection.userChannelName : ''}
          </Text> : <Text style={{
            color: 'gray',
            fontSize: 10,
            marginTop: 20
          }}>chanel: {this.props.sockets.webSocketConnection ? this.props.sockets.webSocketConnection.userChannelName : ''}</Text>
          }
          { __DEV__ ? <View>
            <Button title="LogOut" onPress={() => this.props.userIsLogoutRequest(true)}/>
            <Button style={{backgroundColor:'red'}} title="Clean Hashes" onPress={this.props.cleanHashes}/>
          </View> : null
          }

        </View>
        {/*<Loader*/}
        {/*navFunction={false}*/}
        {/*callRout={'LaunchScreen'}*/}
        {/*operate={['users']}*/}
        {/*/>*/}


        {/*
         <AccessDenied
         handler={this.props.navigation.navigate}
         denied={isNil(this.props.users.userProfile) ? true : !this.props.users.userProfile.options.phoneNoConfirmed}
         />
*/}


      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    sockets: state.sockets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userIsLogoutRequest: (logOut) => {
      dispatch(UsersActions.userIsLogoutRequest(logOut))
    },
    cleanHashes: () => {
      dispatch(HashesActions.cleanHashes())
    },
    userRegisterByPhoneNumberRequest: (phoneNo, password) => {
      dispatch(UsersActions.userRegisterByPhoneNumberRequest(phoneNo, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(LaunchScreen))
