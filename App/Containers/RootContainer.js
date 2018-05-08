import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ReduxNavigation from '../Navigation/ReduxNavigation'
import codePush from 'react-native-code-push';
import { isNil, replace, toLower, indexOf } from 'lodash';
import I18n from 'react-native-i18n';
import PushController, { pushNotificationHandler, socketEventsNotNotify } from '../Controllers/PushController';
//import AppNavigationWithState, { PrimaryNav } from '../Navigation/AppNavigation';
import UpdateActions from '../Redux/UpdateRedux';
import UserActions from '../Redux/UsersRedux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import WebSocketActions from '../Redux/WebSocketRedux';
import { debugDisplay } from '../Services/ApiHelpers';
import styles from './Styles/RootContainerStyles';

import wsApi from '../Services/Sockets/Api';



let api = null

@codePush(
  {
    updateDialog: true,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
  }
)
class RootContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    checkingForUpdateRequest: PropTypes.func,
    connectWebSocketRequest: PropTypes.func,
    emitWebSocketRequest: PropTypes.func,
    downloadingUpdateRequest: PropTypes.func,
    installingUpdateRequest: PropTypes.func,
    update: PropTypes.object,
    userIsLoginRequest: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      version: null,
      update: this.props.update,
      apiOptions: {
        onConnect: (socketApi) => {
          const userChannelName = socketApi.userChannelName
          const signedAuthToken = socketApi.socket.signedAuthToken
          this.props.connectWebSocketRequest(true, userChannelName, signedAuthToken)
        },
        onDisConnect: () => {
          this.props.disconnectWebSocket()
        },
        onEvent: (evName, evData, api) => {
          console.log('EVENT', evData)
          this.props.emitWebSocketRequest(evData)
        }
      }
    }
  }

  codePushStatusDidChange (status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.props.checkingForUpdateRequest(true)
        console.log('CHECKING_FOR_UPDATE')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        //this.props.downloadingUpdateRequest('begin');
        console.log('DOWNLOADING_PACKAGE')
        break
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('AWAITING_USER_ACTION')
        break
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        console.log('SYNC_IN_PROGRESS')
        break
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('UNKNOWN_ERROR')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        this.props.installingUpdateRequest('start')
        console.log('INSTALLING_UPDATE')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        this.props.checkingForUpdateRequest(false)
        console.log('UP_TO_DATE')
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        this.props.installingUpdateRequest('end')
        console.log('')
        break
    }
  }

  codePushDownloadDidProgress (progress) {
    console.log('codePushDownloadDidProgress')
    this.props.downloadingUpdateRequest(
      `${progress.receivedBytes} of ${progress.totalBytes} received`)
  }


  componentWillMount () {
    //this.props.userIsLoginRequest('reduxPersist:users');
  }
  componentDidMount () {
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }
 /*  componentDidMount () {
  }
  componentWillUnmount () {
  }
  */

  componentWillUpdate (newProps) {

  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (!isNil(newProps.users.token) && !newProps.sockets.webSocketConnection && isNil(api)) {

      api = new wsApi(this.state.apiOptions, newProps.users.token)
    }
    if(newProps.users.token !== this.props.users.token && !isNil(api) && !isNil(this.props.users.token)) {
      api.socket.deauthenticate();
      api = null;
      if(!isNil(newProps.users.token)) {
        api = new wsApi(this.state.apiOptions, newProps.users.token)
      }
    }
    if (!isNil(newProps.update.downloading)) {
      this.setState({
        update: newProps.update,
      })
    }
    if (this.props.sockets.webSocketEvent.ev !== newProps.sockets.webSocketEvent.ev
    && !~indexOf(socketEventsNotNotify, newProps.sockets.webSocketEvent.ev)) {
/* forceTest     PushNotification.localNotification({
        title: "My Notification Title 1",
        message: 'You pushed the notification button! 2',
        smallIcon: 'ic_notification'
      });*/
      pushNotificationHandler({
        title: I18n.t('pushMsgTitle'),
        message: replace(toLower(newProps.sockets.webSocketEvent.ev), '_', ' ')
      });

    }

  }

  loaderHandler = () => null

  render () {
    debugDisplay('Root Screen Props', this.props)
    const {status, downloading} = this.state.update
        return (
      <View style={styles.applicationView}>

        <ReduxNavigation key={this.props.users.token}/>
        <PushController update={this.props.update.downloading} message={this.props.update.status}/>
      </View>
    )
  }
}

//
const mapStateToProps = (state) => ({
  update: state.update,
  users: state.users,
  sockets: state.sockets
})
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  checkingForUpdateRequest: (checking) =>
    dispatch(UpdateActions.checkingForUpdateRequest(checking)),
  downloadingUpdateRequest: (counter) =>
    dispatch(UpdateActions.downloadingUpdateRequest(counter)),
  installingUpdateRequest: (progress) =>
    dispatch(UpdateActions.installingUpdateRequest(progress)),
  connectWebSocketRequest: (connection, userChannelName, signedAuthToken) =>
    dispatch(WebSocketActions.connectWebSocketRequest(connection, userChannelName, signedAuthToken)),
  disconnectWebSocket: () =>
    dispatch(WebSocketActions.disconnectWebSocket()),
  emitWebSocketRequest: (event) =>
    dispatch(WebSocketActions.emitWebSocketRequest(event)),
  userIsLoginRequest: (key) => dispatch(UserActions.userIsLoginRequest(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
