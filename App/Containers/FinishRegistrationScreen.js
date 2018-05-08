import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import Loader from '../Components/Loader'
import RoundButton from '../Components/RoundButton'
import InputText from '../Components/InputText'
import UsersActions from '../Redux/UsersRedux'
import { debugDisplay } from '../Services/ApiHelpers'

import styles from './Styles/LoginScreenStyles'
import { Metrics, Colors, Fonts } from '../Themes'

class FinishRegistrationScreen extends PureComponent {
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
    userConfirmPhoneRequest: PropTypes.func,
    users: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { }
    }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

  }

  componentWillUnmount () {
    //this.keyboardDidShowListener.remove();
    //this.keyboardDidHideListener.remove();
    //BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handlePressConfirm = () => {
    const {phone_no, id} = this.props.users.userProfile
    const confirmCode = this.textInputCode.props.value;
    const {token} = this.props.users;
    this.props.userConfirmPhoneRequest(
      id,
      token,
      phone_no,
      confirmCode,
    )
  }

  render () {
    const {height} = this.props.dimensions
    debugDisplay('FinishRegistrationScreen', this.state)
    return (
      <ScrollView
        style={[styles.container,
          {minHeight: height, paddingVertical: 0}]}
        contentContainerStyle={styles.scrollContainerContentCenter}
      >
        <View style={[styles.loginForm, {minHeight: height, paddingVertical: 0}]}>
          <Text style={styles.loginTitle}>{ I18n.t('finishRegistrationScreenTitle') }</Text>
          <Text style={styles.loginComment}>{ I18n.t('reSendCode') }</Text>

          <View style={styles.row}>
            <InputText
              placeholder={'0000'}
              refer={(inputCode) => { this.textInputCode = inputCode }}
              submitEditing={() => {
                this.submitButton.props.onPress()
              }}
            />

            <RoundButton
              ref={(submitForm) => { this.submitButton = submitForm }}
              spaced
              dopStyles={{
                backgroundColor: Colors.white,
                paddingLeft: Metrics.baseMargin * 2,
                paddingRight: Metrics.baseMargin * 2,
                marginHorizontal: Metrics.baseMargin,
                marginTop: Metrics.baseMargin * 3
              }} dopTextStyles={{
              color: Colors.pinkMore
            }} onPress={this.handlePressConfirm}
              text={I18n.t('continue')}
            />
          </View>

        </View>
        <Loader
          navFunction={this.props.navigation.navigate}
          callRout={this.props.navigation.state.routeName}
          repeat
          operate={['users']}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userConfirmPhoneRequest: (id, token, phoneNo, confirmCode) => {
      dispatch(UsersActions.userConfirmPhoneRequest(id, token, phoneNo, confirmCode))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(FinishRegistrationScreen))
