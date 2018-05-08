import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { isNull } from 'lodash'
import Loader from '../Components/Loader'
import InputText from '../Components/InputText'
import InputDropDown from '../Components/InputDropDown'
import RoundButton from '../Components/RoundButton'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import styles from './Styles/LoginScreenStyles'
import { Metrics, Colors } from '../Themes'
import UsersActions from '../Redux/UsersRedux'
import { COUNTRY_PHONES } from '../Config/Constants'
import { debugDisplay } from '../Services/ApiHelpers'

class LoginScreen extends PureComponent  {
  static navigationOptions = {
    title: null,
    headerStyle: {
      elevation: null,
      shadowOpacity: 0,
      height: 0
    },
    headerLeft: null
  }
  static propTypes = {
    dispatch: PropTypes.func,
    userRegisterByPhoneNumberRequest: PropTypes.func,
    users: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      navigator: 'LoginScreen',
    }
  }
  componentWillUnmount() {
    console.log('LOGINSCREENN UNMOUNT')
  }
  handlePressLogin = () => {
    const country = this.textInputCountry.state.buttonText
    const displayName = this.textInputName.props.value
    const phoneNo = this.textInputPhone.props.value
    const password = this.textInputPassword.props.value
    const {token} = this.props.users
    this.props.userRegisterByPhoneNumberRequest(
      displayName,
      phoneNo,
      password,
      country,
      token
    )
  }
  onLayout = event => {
    let {width, height} = event.nativeEvent.layout
    console.log(height);
  }
  render () {
    debugDisplay('LoginScreen state', this.props)
    const {phoneNo, password, displayName, country} = this.props.users.userRegData
    const {height} = this.props.dimensions
    return (
      <ScrollView
        style={styles.container}
        onLayout={this.onLayout}
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.scrollContainerContentCenter}
      >
        <View style={[styles.loginForm, { paddingVertical: Metrics.baseMargin}]}>
          <Text style={styles.loginTitle}>{ I18n.t('loginScreenTitle') }</Text>
          <View style={styles.row}>
            <InputDropDown
              refer={(inputCountry) => { this.textInputCountry = inputCountry }}
              opts={COUNTRY_PHONES}
              selectedIndex={COUNTRY_PHONES.indexOf(country)}
              selectedValue={country}
            />
            <InputText
              placeholder={I18n.t('phoneNumber')}
              refer={(inputPhone) => { this.textInputPhone = inputPhone }}
              submitEditing={() => {this.textInputName.focus()}}
              value={isNull(phoneNo) ? '9020000002' : phoneNo}
            />
            <InputText
              placeholder={I18n.t('name')}
              value={isNull(displayName) ? I18n.t('userName') : displayName}
              refer={(inputName) => { this.textInputName = inputName }}
              submitEditing={() => {this.textInputPassword.focus()}}
            />
            <InputText
              placeholder={I18n.t('password')}
              secure
              refer={(inputPassword) => { this.textInputPassword = inputPassword }}
              value={isNull(password) ? '123456' : password}
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
            }}
              onPress={this.handlePressLogin}
              text={I18n.t('continue')}
            />
          </View>
        </View>

        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['users']}
          callRout={this.props.navigation.state.routeName}
          awaiting
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
    userRegisterByPhoneNumberRequest: (displayName, phoneNo, password, country, token) => {
      dispatch(UsersActions.userRegisterByPhoneNumberRequest(
        displayName,
        phoneNo,
        password,
        country,
        token
      ))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(LoginScreen))
