import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';
import { isEmpty } from 'lodash'
import { PushNotificationIOS, Platform, View, ScrollView } from 'react-native';
//import SuccessView from '../Components/SuccessView'
import styles from '../Components/Styles/LoaderStyles'
export const socketEventsNotNotify = [
  'TEST_EVENT',
  'YOUTUBE_UPLOAD_PROGRESS',
  'YOUTUBE_UPLOAD_DONE',
  'UPLOAD_TO_SERVER_PROGRESS',
  'CREATE_ATTACH',
  'FAILURE_UPLOAD',
  'COMPLETE_UPLOAD'
];

export default class PushController extends Component {
  static propTypes = {
    message: PropTypes.object,
    update: PropTypes.bool
  };
  componentWillMount() {
/*
    PushNotification.configure({
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },
    });
*/
  }
  render() {
    const {message, update} = this.props;
    if(!isEmpty(message) && update) {
      return(
        <ScrollView style={styles.modalBox}>
          <View onLayout={this.handleLayout} style={styles.modalContainer}>
{/*
              <SuccessView success={message} handler={false}/>
*/}
          </View>
        </ScrollView>
      )
    }
    return null;
  }
}
export const pushNotificationHandler = (options) => {
  const {title, message} = options;
  /* if (Platform.OS === 'ios') {
   PushNotification.localNotificationSchedule({
   message: message,
   date: new Date(Date.now()),
   });
   } */
  if (Platform.OS === 'ios') {
    return PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date(Date.now()),
      alertTitle: title,
      alertBody: message
    });
  } else {
/*
    PushNotification.localNotificationSchedule({
      message: message,
      date: new Date(Date.now()),
    });
*/
    return PushNotification.localNotification({
      title: title,
      message: message,
      smallIcon: 'ic_notification'
    });
  }
};
